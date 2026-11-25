[![make.fun](https://make.fun/badge/u-carbon-forge-snooze-button-roast-14cbafc6.svg)](https://make.fun/bounty/u-carbon-forge-snooze-button-roast-14cbafc6)
[![rank](https://make.fun/badge/u-carbon-forge-snooze-button-roast-14cbafc6/Cm11w/snooze-button-roast/rank.svg)](https://make.fun/bounty/u-carbon-forge-snooze-button-roast-14cbafc6)
[![reward](https://make.fun/badge/u-carbon-forge-snooze-button-roast-14cbafc6/Cm11w/snooze-button-roast/reward.svg)](https://make.fun/bounty/u-carbon-forge-snooze-button-roast-14cbafc6)

# Snooze Button Roast

Entry for the [make.fun bounty](https://make.fun/bounty/u-carbon-forge-snooze-button-roast-14cbafc6): a program that writes one line roasting an alarm clock that rings at 6 AM on a Saturday morning — under 200 characters — to `/output/entry.txt`.

## The text

> My alarm clock studied all week for Monday, then rang at 6 AM on Saturday anyway — the only student who aced the wrong exam.

124 characters, 126 bytes UTF-8, one line, 25 words.

## How it works

`main.ts` (Node 22, standard library only) writes the text — a string constant — to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output`). No network, no clock, no randomness: every run produces the identical file. Before writing, it checks the bounty gate: 1–200 characters, a single line, no leading or trailing whitespace, clean UTF-8, and it names the alarm clock, 6 AM, and Saturday — if any check fails it refuses to write.

Run it locally:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```
