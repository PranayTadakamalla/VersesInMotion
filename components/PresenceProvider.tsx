"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type EmotionalMood = "dawn" | "dusk" | "night" | "calm" | "curious" | "intimate";

interface PresenceContextType {
  mood: EmotionalMood;
  isIdle: boolean;
  sessionTime: number;
  hasVisited: boolean;
  lastVisitedPage: string;
  scrollPosition: number;
  updateScrollPosition: (position: number) => void;
  setLastVisitedPage: (page: string) => void;
  rareEventTriggered: boolean;
}

const PresenceContext = createContext<PresenceContextType | undefined>(undefined);

export function PresenceProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMood] = useState<EmotionalMood>("calm");
  const [isIdle, setIsIdle] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [hasVisited, setHasVisited] = useState(false);
  const [lastVisitedPage, setLastVisitedPage] = useState("/");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [rareEventTriggered, setRareEventTriggered] = useState(false);

  // Session time tracking and mood shifts
  useEffect(() => {
    const storedHasVisited = localStorage.getItem("versesHasVisited");
    const storedLastPage = localStorage.getItem("versesLastPage");
    const storedLastVisit = localStorage.getItem("versesLastVisit");

    setHasVisited(!!storedHasVisited);
    if (storedLastPage) setLastVisitedPage(storedLastPage);

    const startTime = Date.now();
    let idleTimer: NodeJS.Timeout;

    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 12000);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);

    idleTimer = setTimeout(() => setIsIdle(true), 12000);

    // Session time tracking
    const sessionInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setSessionTime(elapsed);

      // Determine mood based on session length
      if (elapsed < 30) {
        setMood("calm");
      } else if (elapsed < 120) {
        setMood("curious");
      } else {
        setMood("intimate");
      }

      // Rare event: trigger once per 5+ minute sessions
      if (elapsed === 300 && !rareEventTriggered) {
        setRareEventTriggered(true);
      }
    }, 1000);

    // Time-based mood shifts
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setMood("dawn");
    } else if (hour >= 18 && hour < 21) {
      setMood("dusk");
    } else if (hour >= 21 || hour < 5) {
      setMood("night");
    }

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      clearTimeout(idleTimer);
      clearInterval(sessionInterval);
    };
  }, [rareEventTriggered]);

  // Persist state on page change
  useEffect(() => {
    localStorage.setItem("versesHasVisited", "true");
    localStorage.setItem("versesLastPage", lastVisitedPage);
    localStorage.setItem("versesLastVisit", new Date().toISOString());
  }, [lastVisitedPage]);

  const value: PresenceContextType = {
    mood,
    isIdle,
    sessionTime,
    hasVisited,
    lastVisitedPage,
    scrollPosition,
    updateScrollPosition: setScrollPosition,
    setLastVisitedPage,
    rareEventTriggered,
  };

  return (
    <PresenceContext.Provider value={value}>{children}</PresenceContext.Provider>
  );
}

export function usePresence() {
  const context = useContext(PresenceContext);
  if (!context) {
    throw new Error("usePresence must be used within PresenceProvider");
  }
  return context;
}
