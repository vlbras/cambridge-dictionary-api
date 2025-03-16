import { DictionaryLevel, DictionaryPartOfSpeech } from "../enums";

export interface DictionaryDefinition {
  definition: string;
  partOfSpeech: DictionaryPartOfSpeech;
  level?: DictionaryLevel;
  examples: string[];
}
