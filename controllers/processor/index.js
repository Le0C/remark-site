/**
 * -------------- Processor --------------
 * Unified processer to use with stream.
 */
const unified = require('unified');
const markdown = require('remark-parse');
const slug = require('remark-slug');
const toc = require('remark-toc');
const remark2retext = require('remark-retext');
const english = require('retext-english');
const remark2rehype = require('remark-rehype');
const doc = require('rehype-document');
const format = require('rehype-format')
const html = require('rehype-stringify');
const emoji = require('remark-emoji');
const spacing = require('retext-sentence-spacing');
const indefiniteArticle = require('retext-indefinite-article');
const repeated = require('retext-repeated-words')
const spell = require('retext-spell');
const dictionary = require('dictionary-en-gb');
const urls = require('retext-syntax-urls');
const scripts = require('rehype-javascript-to-bottom');
const minify = require('rehype-minify-javascript-script');
const { getDocCss, getName, splitFileName, scriptInjector } = require('../path/');
const { log } = require('../log/');
require('dotenv').config();
// Global process variables
const ignore_spelling = process.env.ignore_spellcheck.split(',') || ['foo', 'bar']

// TODO: have a way to store and present frontmatter
const makeProcessor = (fName) => {
  log('📚 rendering ' + splitFileName(fName)[splitFileName(fName).length - 1], 'w');
  return processor = unified()
    // enable footnoes
    .use(markdown, { footnotes: true, gfm: true })
    // encode emojs
    .use(emoji)
    .use(
      remark2retext,
      unified()
        .use(english)
        // check for repeated words words
        .use(repeated)
        // A -> An and vice versa
        .use(indefiniteArticle)
        // check for spacing      errors
        .use(spacing)
        // allow spellcheck to ignore links
        .use(urls)
        // check for spelling errors, ignoring the listed words
        .use(spell, { dictionary, ignore: ignore_spelling })
    )
    // ad id's to heading level elements
    .use(slug)
    // enable creating a table of linked headings in files that have a "Table of Contents" heading
    .use(toc)
    // convert to html syntax tree
    .use(remark2rehype)
    // convert to html
    .use(html)
    // inject title stylesheet, favicon & style hack to prevent FOUT
    .use(doc, {
      title: getName(fName),
      style: 'html { visibility: visible; }',
      link: getDocCss(fName),
      script: scriptInjector(fName)
    })
    // tidy html
    .use(format)
    // push <script> tags to bottom of html
    .use(scripts)
    // minify scripts
    .use(minify)
    .use(logger)
}

function logger() {
  log('✅  file render complete!', 's');
}

module.exports = {
  makeProcessor
}