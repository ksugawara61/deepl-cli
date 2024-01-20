# DeepL CLI

## Installation

TBD

## Usage

- help

```
$ deepl --help
deepl - translate words

USAGE: deepl --word <word> --from <from> --to <to>

OPTIONS:
  -h, --help         Show this help message and exit.
  --word, -w <word>  Word to translate.
  --from, -f <from>  Language to translate from.
  --to, -t <to>      Language to translate to.

EXAMPLE:
  deepl --word hello --from EN --to JA

```

- example

```
$ DEEPL_API_KEY=your-api-key deepl --word hello --from EN --to JA
```

## Command

- format

```
$ deno fmt
```

- compile

```
$ deno task compile
```
