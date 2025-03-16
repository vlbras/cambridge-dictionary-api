import { Definition } from "./definition";
import { Pronunciation } from "./pronunciation";

export type Dialect = "us" | "uk";

export interface Word {
  word: string;
  dialects: Record<Dialect, Pronunciation>;
  definitions: Definition[];
}
