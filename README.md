# Netflix TV Picker

This is a lightweight local tool that asks 10 questions and returns three Netflix TV show recommendations under the prompt:

> What show should we watch next?

## What is included right now

- A ready-to-use interactive quiz in [index.html](/Users/stephanievancott/Documents/Codex/2026-05-11-i-want-you-to-create-a/index.html)
- A curated starter catalog in [data/catalog.seed.js](/Users/stephanievancott/Documents/Codex/2026-05-11-i-want-you-to-create-a/data/catalog.seed.js)
- A CSV import script in [scripts/build_catalog_from_csv.mjs](/Users/stephanievancott/Documents/Codex/2026-05-11-i-want-you-to-create-a/scripts/build_catalog_from_csv.mjs) so you can swap in a larger Netflix TV dataset later

## How to use it

1. Open [index.html](/Users/stephanievancott/Documents/Codex/2026-05-11-i-want-you-to-create-a/index.html) in a browser.
2. Answer the 10 questions.
3. Review the three recommendations and the reason each one matched.

## How to scale it to a fuller catalog

If you have a Netflix titles CSV with TV data, run:

```bash
node scripts/build_catalog_from_csv.mjs /path/to/titles.csv ./data/catalog.generated.js
```

Then update the script tag near the bottom of [index.html](/Users/stephanievancott/Documents/Codex/2026-05-11-i-want-you-to-create-a/index.html) from:

```html
<script src="./data/catalog.seed.js"></script>
```

to:

```html
<script src="./data/catalog.generated.js"></script>
```

## Notes

- The included catalog is a strong curated starter set, not a live scrape of every Netflix TV title.
- The scoring logic is in [app.js](/Users/stephanievancott/Documents/Codex/2026-05-11-i-want-you-to-create-a/app.js) if you want to tune how much each answer matters.
