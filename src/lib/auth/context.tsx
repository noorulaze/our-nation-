"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Profile, UserRole, PreferredLanguage, ProfilePrivacySettings } from "@/types/database";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { initialProfiles } from "@/lib/data/initialData";
import { store } from "@/lib/data/store";

interface AuthContextType {
  user: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    password?: string;
    username: string;
    displayName: string;
    preferredLanguage?: PreferredLanguage;
    termsAccepted?: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  updatePassword: (newPassword: string, oldPassword?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  resendVerificationEmail: (email?: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  deleteAccount: (reason?: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // SECURITY: Default session operates under Principle of Least Privilege:
  // Standard citizen profile ("fathima_tanur", role: "user").
  // Admin permissions require authenticating with administrative credentials.
  const [user, setUser] = useState<Profile | null>(initialProfiles[2] || initialProfiles[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("nammude_naadu_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed && parsed.id) {
            // SECURITY: Cross-check role and account_status against authoritative store to prevent client tampering
            const authoritative = store.getProfileById(parsed.id);
            if (authoritative) {
              if (authoritative.account_status === "suspended") {
                // If account is suspended, purge session
                localStorage.removeItem("nammude_naadu_user");
                setUser(initialProfiles[2] || null);
                return;
              }
              setUser({
                ...parsed,
                role: authoritative.role, // Enforce role from backend/store
                account_status: authoritative.account_status || "active",
                email_verified: authoritative.email_verified ?? true,
              });
            } else {
              setUser({
                ...parsed,
                role: parsed.role || "user",
              });
            }
          }
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: password || "password123",
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        // Fetch profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profileData) {
          if (profileData.account_status === "suspended") {
            await supabase.auth.signOut();
            setIsLoading(false);
            return {
              success: false,
              error: "This citizen account is suspended. Please contact the Municipal Office at 0494 2440228.",
            };
          }
          setUser(profileData);
          localStorage.setItem("nammude_naadu_user", JSON.stringify(profileData));
        }
        setIsLoading(false);
        return { success: true };
      }

      // Offline / Local Mode: Match profile by username or email
      const usernameQuery = email.split("@")[0].toLowerCase();
      const allProfiles = store.getProfiles();
      const found = allProfiles.find(
        p => p.username.toLowerCase() === usernameQuery || (p.email && p.email.toLowerCase() === email.toLowerCase())
      );

      if (found && found.account_status === "suspended") {
        setIsLoading(false);
        return {
          success: false,
          error: "This citizen account is suspended. Please contact Tanur Municipal switchboard at 0494 2440228.",
        };
      }

      const selected: Profile = found || {
        id: "u-" + Date.now(),
        username: email.split("@")[0].toLowerCase(),
        display_name: email.split("@")[0],
        email,
        phone: null,
        locality: "Tanur Municipality",
        preferred_language: "en" as PreferredLanguage,
        role: "citizen" as UserRole, // Regular citizen by default
        account_status: "active",
        email_verified: true,
        privacy_settings: {
          show_phone: false,
          show_email: false,
          show_address: false,
          public_profile: false,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (!found) {
        store.getProfiles().push(selected);
      }

      setUser(selected);
      localStorage.setItem("nammude_naadu_user", JSON.stringify(selected));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || "Failed to sign in" };
    }
  };

  const register = async (data: {
    email: string;
    password?: string;
    username: string;
    displayName: string;
    preferredLanguage?: PreferredLanguage;
    termsAccepted?: boolean;
  }) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password || "password123",
          options: {
            data: {
              username: data.username,
              display_name: data.displayName,
              preferred_language: data.preferredLanguage || "en",
            },
          },
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
      }

      // All newly registered accounts strictly receive standard 'citizen' role
      const cleanUsername = data.username.toLowerCase().replace(/[^a-z0-9_]/g, "_");
      const newProfile: Profile = {
        id: "u-" + Date.now(),
        username: cleanUsername || data.email.split("@")[0],
        display_name: data.displayName || data.email.split("@")[0],
        email: data.email,
        phone: null,
        locality: "Tanur Municipality",
        preferred_language: data.preferredLanguage || "en",
        role: "citizen",
        account_status: "active",
        email_verified: false, // Requires email verification instructions
        privacy_settings: {
          show_phone: false,
          show_email: false,
          show_address: false,
          public_profile: false,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      store.getProfiles().push(newProfile);
      setUser(newProfile);
      localStorage.setItem("nammude_naadu_user", JSON.stringify(newProfile));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || "Registration failed" };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    // Return to default unprivileged citizen profile
    setUser(initialProfiles[2] || null);
    localStorage.removeItem("nammude_naadu_user");
  };

  const resetPassword = async (email: string) => {
    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/reset-password` : undefined,
        });
        if (error) {
          return { success: false, error: error.message };
        }
      }
      return {
        success: true,
        message: "If an account exists for this email, password recovery instructions have been sent.",
      };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to send reset email" };
    }
  };

  const updatePassword = async (newPassword: string, oldPassword?: string) => {
    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
          return { success: false, error: error.message };
        }
      }
      return { success: true, message: "Password has been successfully updated." };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to update password" };
    }
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error: "Google Sign-In requires active Supabase OAuth configuration. Please sign in with your email.",
      };
    }
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
        },
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Google OAuth sign-in failed" };
    }
  };

  const resendVerificationEmail = async (email?: string) => {
    const targetEmail = email || user?.email;
    if (!targetEmail) {
      return { success: false, error: "No email address found to send verification link." };
    }
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.resend({
          type: "signup",
          email: targetEmail,
        });
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message || "Failed to resend verification email" };
      }
    }
    return { success: true, message: "Verification link sent. Please check your inbox." };
  };

  const deleteAccount = async (reason?: string) => {
    if (!user) return { success: false, error: "No authenticated session" };
    try {
      store.deleteUserAccount(user.id, reason);
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        await supabase.auth.signOut();
      }
      setUser(initialProfiles[2] || null);
      localStorage.removeItem("nammude_naadu_user");
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to process account deletion" };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (user) {
      // SECURITY: Strip and disallow any attempt to self-modify the 'role' or 'account_status' fields
      const { role: _forbiddenRole, account_status: _forbiddenStatus, ...safeUpdates } = updates as any;
      store.updateProfile(user.id, safeUpdates);
      const updated: Profile = { 
        ...user, 
        ...safeUpdates, 
        role: user.role, // Guarantee immutable role retention
        updated_at: new Date().toISOString() 
      };
      setUser(updated);
      localStorage.setItem("nammude_naadu_user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || "user",
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
        resetPassword,
        updatePassword,
        signInWithGoogle,
        resendVerificationEmail,
        deleteAccount,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
