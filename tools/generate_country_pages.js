#!/usr/bin/env node
/*
  Simple generator to render country pages from a template and JSON data.
  Usage:
    node tools/generate_country_pages.js data/countries
*/
const fs = require('fs');
const path = require('path');

const templatePath = path.resolve(__dirname, '..', 'templates', 'country.html');
const outDir = path.resolve(__dirname, '..', 'ndc');

function render(template, data) {
  return template
    .replace(/\{\{SLUG\}\}/g, data.slug)
    .replace(/\{\{COUNTRY_NAME\}\}/g, data.country_name)
    .replace(/\{\{MITIGATION_EMBED_HTML\}\}/g, data.mitigation_embed_html)
    .replace(/\{\{ADAPTATION_EMBED_HTML\}\}/g, data.adaptation_embed_html)
    // SDG 8.3
    .replace(/\{\{SDG_83_TITLE\}\}/g, data.sdg_83_title)
    .replace(/\{\{SDG_83_SUBTITLE\}\}/g, data.sdg_83_subtitle)
    .replace(/\{\{SDG_83_PARAGRAPH_1\}\}/g, data.sdg_83_paragraph_1)
    .replace(/\{\{SDG_83_PARAGRAPH_2\}\}/g, data.sdg_83_paragraph_2)
    .replace(/\{\{SDG_83_UNDP_DATASRC\}\}/g, data.sdg_83_undp_datasrc)
    // SDG 8.4
    .replace(/\{\{SDG_84_TITLE\}\}/g, data.sdg_84_title)
    .replace(/\{\{SDG_84_SUBTITLE\}\}/g, data.sdg_84_subtitle)
    .replace(/\{\{SDG_84_PARAGRAPH_1\}\}/g, data.sdg_84_paragraph_1)
    .replace(/\{\{SDG_84_PARAGRAPH_2\}\}/g, data.sdg_84_paragraph_2)
    .replace(/\{\{SDG_84_UNDP_DATASRC\}\}/g, data.sdg_84_undp_datasrc)
    // SDG 9.1
    .replace(/\{\{SDG_91_TITLE\}\}/g, data.sdg_91_title)
    .replace(/\{\{SDG_91_SUBTITLE\}\}/g, data.sdg_91_subtitle)
    .replace(/\{\{SDG_91_PARAGRAPH_1\}\}/g, data.sdg_91_paragraph_1)
    .replace(/\{\{SDG_91_PARAGRAPH_2\}\}/g, data.sdg_91_paragraph_2)
    .replace(/\{\{SDG_91_UNDP_DATASRC\}\}/g, data.sdg_91_undp_datasrc)
    // SDG 9.4
    .replace(/\{\{SDG_94_TITLE\}\}/g, data.sdg_94_title)
    .replace(/\{\{SDG_94_SUBTITLE\}\}/g, data.sdg_94_subtitle)
    .replace(/\{\{SDG_94_PARAGRAPH_1\}\}/g, data.sdg_94_paragraph_1)
    .replace(/\{\{SDG_94_PARAGRAPH_2\}\}/g, data.sdg_94_paragraph_2)
    .replace(/\{\{SDG_94_UNDP_DATASRC\}\}/g, data.sdg_94_undp_datasrc);
}

function main() {
  const inputDir = process.argv[2] || path.resolve(__dirname, '..', 'data', 'countries');
  const template = fs.readFileSync(templatePath, 'utf8');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.json'));
  files.forEach(file => {
    const json = JSON.parse(fs.readFileSync(path.join(inputDir, file), 'utf8'));
    const html = render(template, json);
    const outFile = path.join(outDir, `${json.slug}.html`);
    fs.writeFileSync(outFile, html, 'utf8');
    console.log(`Generated: ${outFile}`);
  });
}

main();
