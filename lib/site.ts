import { site } from "./content";
import type { Social } from "./schema";

export const SOCIAL_LIST: Social[] = site.socials;

/** Look a link up by its id (instagram, linkedin, …). */
export const social = (id: string) => SOCIAL_LIST.find((s) => s.id === id);
