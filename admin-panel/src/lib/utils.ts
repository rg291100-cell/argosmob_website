import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiBaseUrl(): string {
  // Explicit override — set NEXT_PUBLIC_API_URL in production (client + server)
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) return envUrl.replace(/\/+$/, "");

  if (typeof window !== "undefined") {
    // Client-side (browser) - dynamically use the current host's IP/domain
    const hostname = window.location.hostname;
    return `http://${hostname}:5001`;
  }
  // Server-side (SSR) fallback
  return "http://localhost:5001";
}

export const API_BASE_URL = getApiBaseUrl();
