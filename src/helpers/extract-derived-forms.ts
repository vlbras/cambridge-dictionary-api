import * as cheerio from "cheerio";
import { DictionaryDerivedForm } from "../interfaces";

export function extractDerivedForms(
  $: cheerio.CheerioAPI
): DictionaryDerivedForm {
  // in beta development
  const derivedForms: DictionaryDerivedForm = {
    noun: [],
  };

  const noun = $(".w.dw").first().text().trim();

  if (noun) {
    derivedForms.noun.push(noun);
  }

  if (derivedForms.noun.length === 0) {
    return undefined;
  }

  return derivedForms;
}
