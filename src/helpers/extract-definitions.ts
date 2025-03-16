import * as cheerio from "cheerio";
import { DictionaryDefinition } from "../interfaces";
import { DictionaryLevel, DictionaryPartOfSpeech } from "../enums";

export function extractDefinitions(
  $: cheerio.CheerioAPI
): DictionaryDefinition[] {
  const definitions: DictionaryDefinition[] = [];

  $(".pr.entry-body__el").each((_, entry) => {
    const posElement = $(entry).find(".pos.dpos").first();
    if (!posElement.length) return;

    const partOfSpeech = posElement.text().trim() as DictionaryPartOfSpeech;

    $(entry)
      .find(".def-block.ddef_block")
      .each((_, defBlock) => {
        const definitionElement = $(defBlock).find(".def.ddef_d.db");
        if (!definitionElement.length) return;

        const definition = definitionElement.text().trim();
        const levelElement = $(defBlock).find(".epp-xref.dxref");
        const level = levelElement.length
          ? (levelElement.text().trim() as DictionaryLevel)
          : undefined;

        const examples: string[] = [];
        $(defBlock)
          .find(".examp.dexamp .eg.deg")
          .each((_, ex) => {
            const text = $(ex).text().trim();
            if (text) examples.push(text);
          });

        if (examples.length >= 2) {
          definitions.push({
            definition,
            partOfSpeech,
            level,
            examples,
          });
        }
      });
  });

  return definitions;
}
