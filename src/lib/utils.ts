import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Client-side (browser) - dynamically use the current host's IP/domain
    const hostname = window.location.hostname;
    return `http://${hostname}:5000`;
  }
  // Server-side (SSR) fallback
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
}

export const API_BASE_URL = getApiBaseUrl();
