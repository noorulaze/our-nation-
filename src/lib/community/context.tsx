"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Community } from "@/types/database";

interface CommunityContextType {
  currentCommunity: Community | null;
  setCurrentCommunity: (community: Community | null) => void;
  availableCommunities: Community[];
  setAvailableCommunities: (communities: Community[]) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  isLoading: boolean;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export function CommunityProvider({
  children,
  initialCommunities = [],
  defaultCommunity = null,
}: {
  children: React.ReactNode;
  initialCommunities?: Community[];
  defaultCommunity?: Community | null;
}) {
  const [currentCommunity, setCurrentCommunityState] = useState<Community | null>(defaultCommunity);
  const [availableCommunities, setAvailableCommunities] = useState<Community[]>(initialCommunities);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check local storage for saved community preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nammude_naadu_selected_community");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.id) {
            setCurrentCommunityState(parsed);
          }
        } catch {
          // ignore corrupted json
        }
      }
    }
  }, []);

  const setCurrentCommunity = (comm: Community | null) => {
    setCurrentCommunityState(comm);
    if (typeof window !== "undefined") {
      if (comm) {
        localStorage.setItem("nammude_naadu_selected_community", JSON.stringify(comm));
      } else {
        localStorage.removeItem("nammude_naadu_selected_community");
      }
    }
  };

  return (
    <CommunityContext.Provider
      value={{
        currentCommunity,
        setCurrentCommunity,
        availableCommunities,
        setAvailableCommunities,
        selectedDistrict,
        setSelectedDistrict,
        isLoading,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunity must be used within a CommunityProvider");
  }
  return context;
}
