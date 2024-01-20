import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";
import { z } from "https://deno.land/x/zod/mod.ts";
import { DeepLClient } from "npm:deepl-lightweight-client@0.0.7";

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

const showHelp = () => {
  console.log("deepl - translate words");
  console.log("");
  console.log("USAGE: deepl --word <word> --from <from> --to <to>");
  console.log("");
  console.log("OPTIONS:");
  console.log("  -h, --help         Show this help message and exit.");
  console.log("  --word, -w <word>  Word to translate.");
  console.log("  --from, -f <from>  Language to translate from.");
  console.log("  --to, -t <to>      Language to translate to.");
  console.log("");
  console.log("EXAMPLE:");
  console.log("  deepl --word hello --from EN --to JA");
  console.log("");
  Deno.exit(0);
};

const run = async (word: string, from: Language, to: Language) => {
  try {
    const result = await client.translateText(word, from, to);
    console.log(result.text);
  } catch (e) {
    console.error("Failed to translate");
    console.error("");
    console.error("message:");
    console.error(`  ${e.message}`);
    console.error("  You should check your API key (DEEPL_API_KEY)");
    Deno.exit(1);
  }
};

const args = parseArgs(Deno.args, {
  boolean: ["help"],
  string: ["word", "from", "to"],
  default: { from: "EN", to: "JA" },
  alias: { help: "h", from: "f", to: "t", word: "w" },
});

if (args.help) {
  showHelp();
}

try {
  const schema = z.object({
    from: z.enum(languages),
    to: z.enum(languages),
    word: z.string().min(1),
  });
  const { word, from, to } = schema.parse(args);
  run(word, from, to);
} catch (e) {
  console.error("Failed to parse arguments");
  if (e instanceof z.ZodError) {
    console.error(e.errors.map((e) => `${e.path}: ${e.message}`).join("\n"));
  }
  Deno.exit(1);
}
