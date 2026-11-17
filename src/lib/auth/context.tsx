"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Profile, UserRole, PreferredLanguage } from "@/types/database";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { initialProfiles } from "@/lib/data/initialData";

interface AuthContextType {
  user: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; password?: string; username: string; displayName: string; preferredLanguage?: PreferredLanguage }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchUserRole: (role: UserRole) => void;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Default to demo admin profile for seamless inspection and full administrative access out of the box
  const [user, setUser] = useState<Profile | null>(initialProfiles[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("nammude_naadu_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed && parsed.id) {
            setUser(parsed);
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
          setUser(profileData);
          localStorage.setItem("nammude_naadu_user", JSON.stringify(profileData));
        }
        setIsLoading(false);
        return { success: true };
      }

      // Offline / Local Mode: Match profile by username or create demo profile
      const found = initialProfiles.find(p => p.username.toLowerCase() === email.split("@")[0].toLowerCase());
      const selected = found || {
        id: "u-" + Date.now(),
        username: email.split("@")[0],
        display_name: email.split("@")[0],
        preferred_language: "ml" as PreferredLanguage,
        role: "user" as UserRole,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setUser(selected);
      localStorage.setItem("nammude_naadu_user", JSON.stringify(selected));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || "Failed to sign in" };
    }
  };

  const register = async (data: { email: string; password?: string; username: string; displayName: string; preferredLanguage?: PreferredLanguage }) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password || "password123",
          options: {
            data: {
              username: data.username,
              display_name: data.displayName,
              preferred_language: data.preferredLanguage || "ml",
            },
          },
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
      }

      const newProfile: Profile = {
        id: "u-" + Date.now(),
        username: data.username,
        display_name: data.displayName,
        preferred_language: data.preferredLanguage || "ml",
        role: "user",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
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
    setUser(null);
    localStorage.removeItem("nammude_naadu_user");
  };

  const switchUserRole = (newRole: UserRole) => {
    if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
      localStorage.setItem("nammude_naadu_user", JSON.stringify(updated));
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (user) {
      const updated = { ...user, ...updates, updated_at: new Date().toISOString() };
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
        switchUserRole,
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
