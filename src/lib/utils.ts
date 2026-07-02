import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiBaseUrl(): string {
  // Explicit override — set NEXT_PUBLIC_API_URL in production (client + server)
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) return envUrl.replace(/\/+$/, "");

  if (typeof window !== "undefined") {
    // Local dev fallback: same host on :5001, matching the page's scheme
    // so HTTPS pages never make mixed-content (blocked) requests
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:5001`;
  }

  // Server-side local dev fallback
  return "http://localhost:5001";
}

export const API_BASE_URL = getApiBaseUrl();
