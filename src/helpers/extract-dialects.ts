import * as cheerio from "cheerio";
import { Dialect, Pronunciation } from "../interfaces";

export const BASE_URL = "https://dictionary.cambridge.org";

export function extractDialects(
  $: cheerio.CheerioAPI
): Record<Dialect, Pronunciation> {
  const pronunciations: Record<Dialect, Pronunciation> = {
    us: { url: "", pron: "" },
    uk: { url: "", pron: "" },
  };

  $(".pos-header.dpos-h .dpron-i").each((_, node) => {
    const dialectText = $(node).find(".region").text().trim().toLowerCase();
    if (dialectText !== "us" && dialectText !== "uk") return;

    if (
      pronunciations[dialectText as Dialect].url ||
      pronunciations[dialectText as Dialect].pron
    ) {
      return;
    }

    const audioSource = $(node).find("audio source").attr("src");
    const pron = $(node).find(".pron.dpron").text().trim();

    if (audioSource) {
      pronunciations[dialectText as Dialect] = {
        url: BASE_URL + audioSource,
        pron,
      };
    }
  });

  return pronunciations;
}
