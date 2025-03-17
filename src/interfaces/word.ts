import { DictionaryDialect, DictionaryPartOfSpeech } from "../enums";
import { DictionaryDefinition } from "./definition";
import { DictionaryPronunciation } from "./pronunciation";

export interface DictionaryWord {
  word: string;
  dialects: Record<DictionaryDialect, DictionaryPronunciation>;
  definitions: DictionaryDefinition[];
  derivedForms: DictionaryDerivedForm;
}

export type DictionaryDerivedForm =
  | Partial<Record<DictionaryPartOfSpeech, string[]>>
  | undefined;
