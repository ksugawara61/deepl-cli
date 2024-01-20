import { DeepLClient, Language } from "npm:deepl-lightweight-client@0.0.7";

const client = new DeepLClient(Deno.env.get("DEEPL_API_KEY") ?? "");

export const showHelp = () => {
  console.log(`deepl - translate words

USAGE: deepl --word <word> --from <from> --to <to>

OPTIONS:
  -h, --help         Show this help message and exit.
  -u, --usage        Show usage and exit.
  --word, -w <word>  Word to translate.
  --from, -f <from>  Language to translate from.
  --to, -t <to>      Language to translate to.

EXAMPLE:
  deepl --word hello --from EN --to JA
  `);
};

export const showUsage = async () => {
  const result = await client.usage();
  console.log(
    `character_count: ${result.character_count} / ${result.character_limit}`,
  );
};

export const translateText = async (
  word: string,
  from: Language,
  to: Language,
) => {
  const result = await client.translateText(word, from, to);
  console.log(result.text);
};
