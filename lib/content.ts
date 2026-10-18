import raw from "@/content/site.json";
import type { SiteContent } from "./schema";

/** Everything the site shows, as last published from the Curator. */
export const site = raw as unknown as SiteContent;
export const copy = site.copy;
