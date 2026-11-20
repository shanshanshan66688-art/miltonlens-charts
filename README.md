# miltonlens-charts

Interactive chart pages for the Milton Lens newsletter, served by GitHub Pages.

- One folder per article, one HTML page per chart.
- `_template.html` is the page shell; each page sets `window.CHART` (title, data, notes, sources) and `assets/mlchart.js` renders the chart, data table, CSV download and sources.
- House style lives in `assets/style.css` (navy #0E2340, muted gold #B8A57A, white background).
- `crcl/` is a standalone research note in Chinese (CRCL valuation map and buy grid). It is one self-contained page, does not use `_template.html`, and is not linked from the index.
- `tem/` is a second standalone research note in Chinese (Tempus AI valuation map and buy grid), built the same way as `crcl/`: one self-contained page, not linked from the index.
