import type { MetadataRoute } from "next";
import { API_BASE_URL } from "@/lib/utils";

const BASE_URL = "https://argosmob.com";

const staticPaths = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/tech-stack",
  "/stories",
  "/testimonials",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  let storyRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/stories`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const stories = await res.json();
      storyRoutes = stories
        .filter((s: any) => s.status === "published" && s.slug)
        .map((s: any) => ({
          url: `${BASE_URL}/stories/${s.slug}`,
          lastModified: s.updated_at
            ? new Date(s.updated_at)
            : new Date(s.created_at),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
    }
  } catch {
    // API unreachable — ship the static routes rather than failing the sitemap
  }

  return [...staticRoutes, ...storyRoutes];
}
