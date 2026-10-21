import type { MetadataRoute } from "next";
import { site } from "@/content/book";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/`, lastModified: new Date() }];
}
