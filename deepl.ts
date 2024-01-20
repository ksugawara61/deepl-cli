import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";
import { DeepLClient } from "npm:deepl-lightweight-client@0.0.7";

// deno compile --allow-read --allow-env --allow-net deepl.ts

const client = new DeepLClient(Deno.env.get("DEEPL_API_KEY") ?? "");

const languages = [
  "BG",
  "CS",
  "DA",
  "DE",
  "EL",
  "EN",
  "ES",
  "ET",
  "FI",
  "FR",
  "HU",
  "IT",
  "JA",
  "LT",
  "LV",
  "NL",
  "PL",
  "PT",
  "RO",
  "RU",
  "SK",
  "SL",
  "SV",
  "ZH",
] as const;
type Language = typeof languages[number];
const isLanguage = (lang: string): lang is Language => {
  return languages.includes(lang as Language);
};

const run = async (word: string, from: Language, to: Language) => {
  try {
    const result = await client.translateText(word, from, to);
    console.log(result.text);
  } catch (e) {
    console.error("Failed to translate");
    console.error("message:", e.message);
    Deno.exit(1);
  }
};

const { help, word, from, to } = parseArgs(Deno.args, {
  boolean: ["help"],
  string: ["word", "from", "to"],
  default: { from: "en", to: "ja" },
  alias: { help: "h", from: "f", to: "t", word: "w" },
});

if (help) {
  console.log("TODO: show help");
  Deno.exit(0);
}

if (!word) {
  console.error("word is required");
  Deno.exit(1);
}

const upperFrom = from.toUpperCase();
if (!isLanguage(upperFrom)) {
  console.error("from is invalid language");
  Deno.exit(1);
}

const upperTo = to.toUpperCase();
if (!isLanguage(upperTo)) {
  console.error("to is invalid language");
  Deno.exit(1);
}

run(word, upperFrom, upperTo);
