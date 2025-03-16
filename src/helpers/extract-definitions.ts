import * as cheerio from "cheerio";
import { Definition, Level, PartOfSpeech } from "../interfaces";

export function extractDefinitions($: cheerio.CheerioAPI): Definition[] {
  return $(".pr.entry-body__el")
    .map((_, entry) => {
      const pos = $(entry)
        .find(".pos.dpos")
        .first()
        .text()
        .trim() as PartOfSpeech;

      return $(entry)
        .find(".def-block.ddef_block")
        .map((_, defBlock) => {
          const meaning = $(defBlock).find(".def.ddef_d.db").text().trim();

          if (!meaning) return null;

          const level = ($(defBlock).find(".epp-xref.dxref").text().trim() ||
            undefined) as Level;

          const examples = $(defBlock)
            .find(".examp.dexamp")
            .map((_, ex) => ({
              sentence: $(ex).find(".eg.deg").text().trim(),
              translation: $(ex).find(".trans.dtrans").text().trim(),
            }))
            .get()
            .map((example) => example.sentence);

          if (examples.length < 3) return null;

          return { pos, level, meaning, examples };
        })
        .get()
        .filter((def) => def !== null);
    })
    .get();
}
