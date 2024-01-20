import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { showHelp, showUsage, translateText } from "./utils.ts";

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

const args = parseArgs(Deno.args, {
  boolean: ["help", "usage"],
  string: ["word", "from", "to"],
  default: { from: "EN", to: "JA" },
  alias: { help: "h", usage: "u", from: "f", to: "t", word: "w" },
});

if (args.help) {
  showHelp();
  Deno.exit(0);
}

if (args.usage) {
  try {
    await showUsage();
    Deno.exit(0);
  } catch (e) {
    console.error("Failed to get usage");
    console.error(e.message);
    console.error("You should check your API key (DEEPL_API_KEY)");
    Deno.exit(1);
  }
}

try {
  const schema = z.object({
    from: z.enum(languages),
    to: z.enum(languages),
    word: z.string().min(1),
  });
  const { word, from, to } = schema.parse(args);
  await translateText(word, from, to);
  Deno.exit(0);
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error("Failed to parse arguments");
    console.error(e.errors.map((e) => `${e.path}: ${e.message}`).join("\n"));
  } else {
    console.error("Failed to translate");
    console.error(e.message);
    console.error("You should check your API key (DEEPL_API_KEY)");
  }
  Deno.exit(1);
}
