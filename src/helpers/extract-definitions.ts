import * as cheerio from "cheerio";
import { Definition, Level, PartOfSpeech } from "../interfaces";

export function extractDefinitions($: cheerio.CheerioAPI): Definition[] {
  const definitions: Definition[] = [];

  $(".pr.entry-body__el").each((_, entry) => {
    const posElement = $(entry).find(".pos.dpos").first();
    if (!posElement.length) return;

    const pos = posElement.text().trim() as PartOfSpeech;

    $(entry)
      .find(".def-block.ddef_block")
      .each((_, defBlock) => {
        const meaningElement = $(defBlock).find(".def.ddef_d.db");
        if (!meaningElement.length) return;

        const meaning = meaningElement.text().trim();
        const levelElement = $(defBlock).find(".epp-xref.dxref");
        const level = levelElement.length
          ? (levelElement.text().trim() as Level)
          : undefined;

        const examples: string[] = [];
        $(defBlock)
          .find(".examp.dexamp .eg.deg")
          .each((_, ex) => {
            const text = $(ex).text().trim();
            if (text) examples.push(text);
          });

        if (examples.length >= 2) {
          definitions.push({ pos, level, meaning, examples });
        }
      });
  });

  return definitions;
}
