import { DictionaryDialect } from "../enums";
import { DictionaryDefinition } from "./definition";
import { DictionaryPronunciation } from "./pronunciation";

export interface DictionaryWord {
  word: string;
  dialects: Record<DictionaryDialect, DictionaryPronunciation>;
  definitions: DictionaryDefinition[];
}
