export type PartOfSpeech = "noun" | "verb" | "adjective" | "adverb";
export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface Definition {
  pos: PartOfSpeech;
  level?: Level;
  meaning: string;
  examples: string[];
}
