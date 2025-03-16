import axios from "axios";
import * as cheerio from "cheerio";
import { DictionaryError, Word } from "./interfaces";
import { extractDialects, extractDefinitions, BASE_URL } from "./helpers";

const DICTIONARY_URL = `${BASE_URL}/us/dictionary/english/`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

export async function fetchWord(
  entry: string,
  retries: number = MAX_RETRIES
): Promise<Word | DictionaryError> {
  try {
    const html = await fetchHtml(DICTIONARY_URL + entry);
    const $ = cheerio.load(html);

    return {
      word: $(".hw.dhw").first().text().trim(),
      dialects: extractDialects($),
      definitions: extractDefinitions($),
    };
  } catch (error: any) {
    return handleRetry(error, entry, retries);
  }
}

async function fetchHtml(url: string): Promise<string> {
  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": USER_AGENT },
      timeout: 3000,
    });
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch HTML: ${error.message}`);
  }
}

async function handleRetry(
  error: any,
  entry: string,
  retries: number
): Promise<Word | DictionaryError> {
  if (retries > 0) {
    console.warn(`Error: ${error.message}. Retrying (${retries} left)...`);
    await new Promise((res) =>
      setTimeout(res, RETRY_DELAY_MS * (MAX_RETRIES - retries + 1))
    );
    return fetchWord(entry, retries - 1);
  }
  return { error: error.message || "Failed to fetch dictionary data" };
}

export * from "./interfaces";
