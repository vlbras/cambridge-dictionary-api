import * as cheerio from "cheerio";
import { DictionaryDialect } from "../enums";
import { DictionaryPronunciation } from "../interfaces";

export const BASE_URL = "https://dictionary.cambridge.org";

export function extractDialects(
  $: cheerio.CheerioAPI
): Record<DictionaryDialect, DictionaryPronunciation> {
  const pronunciations: Record<DictionaryDialect, DictionaryPronunciation> = {
    us: { audio: "", phonetic: "" },
    uk: { audio: "", phonetic: "" },
  };

  $(".pos-header.dpos-h .dpron-i").each((_, node) => {
    const dialectText = $(node).find(".region").text().trim().toLowerCase();
    if (dialectText !== "us" && dialectText !== "uk") return;

    if (
      pronunciations[dialectText as DictionaryDialect].audio ||
      pronunciations[dialectText as DictionaryDialect].phonetic
    ) {
      return;
    }

    const audioSource = $(node).find("audio source").attr("src");
    const phonetic = $(node).find(".pron.dpron").text().trim();

    if (audioSource) {
      pronunciations[dialectText as DictionaryDialect] = {
        audio: BASE_URL + audioSource,
        phonetic,
      };
    }
  });

  return pronunciations;
}
