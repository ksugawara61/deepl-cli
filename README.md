# DeepL CLI

deepl-cli is unofficial DeepL CLI. It is useful for translating Language easily.

## Installation

Executable binaries are available at
[releases](https://github.com/ksugawara61/deepl-cli/releases).

## Usage

```
$ deepl --help
deepl - translate words

USAGE: deepl --word <word> --from <from> --to <to>

OPTIONS:
  -h, --help         Show this help message and exit.
  -u, --usage        Show usage and exit.
  --word, -w <word>  Word to translate.
  --from, -f <from>  Language to translate from.
  --to, -t <to>      Language to translate to.

EXAMPLE:
  deepl --word hello --from EN --to JA
```

## Description

Example 1:

```bash
$ DEEPL_API_KEY=your-api-key deepl --word hello --from EN --to JA
こんにちわ
```

Example 2:

```bash
$ DEEPL_API_KEY=your-api-key deepl --usage
character_count: 667 / 500000
```

## Build

```bash
$ git clone git@github.com:ksugawara61/deepl-cli.git
$ deno task compile
```
