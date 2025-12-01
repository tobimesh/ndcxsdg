# Country Page Generator

Generate NDC x SDG country pages from a reusable template.

## Files
- `templates/country.html` — base template with placeholders.
- `data/countries/*.json` — one JSON per country with content and embed codes.
- `tools/generate_country_pages.js` — generator script.

## JSON schema
```
{
  "slug": "lao-pdr",
  "country_name": "Lao PDR",
  "mitigation_embed_html": "<div class=\"flourish-embed flourish-bubble-chart\" data-src=\"visualisation/22320282\"></div>",
  "adaptation_embed_html": "<div class=\"flourish-embed flourish-bubble-chart\" data-src=\"visualisation/22320414\"></div>",
  "sdg_83_title": "...",
  "sdg_83_subtitle": "...",
  "sdg_83_paragraph_1": "...",
  "sdg_83_paragraph_2": "...",
  "sdg_83_undp_datasrc": "798127c1c210bcdc084e0eb56f71be48"
}
```

## Generate pages
Run from the workspace root:

```zsh
node tools/generate_country_pages.js data/countries
```

Outputs HTML files to `ndc/<slug>.html`.

## Notes
- The template uses the same scaling and layout as `cambodia.html` for Flourish embeds (scale 1.1, 450px container).
- Extend the template and script to add more SDG sections by introducing additional placeholders and JSON fields.
