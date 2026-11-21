# miltonlens-charts

Interactive chart pages for the Milton Lens newsletter, served by GitHub Pages.

- One folder per article, one HTML page per chart.
- `_template.html` is the page shell; each page sets `window.CHART` (title, data, notes, sources) and `assets/mlchart.js` renders the chart, data table, CSV download and sources.
- House style lives in `assets/style.css` (navy #0E2340, muted gold #B8A57A, white background).
- `crcl/` is a standalone research note in Chinese (CRCL valuation map and buy grid). It is one self-contained page, does not use `_template.html`, and is not linked from the index.
- `tem/` is a second standalone research note in Chinese (Tempus AI valuation map and buy grid), built the same way as `crcl/`: one self-contained page, not linked from the index.
- `talkweb/` is a third standalone research note in Chinese (Talkweb 拓维信息 002261.SZ: what the price implies, peer valuation map, scenarios and buy grid), built the same way as `crcl/` and `tem/`: one self-contained page, not linked from the index.
- `tide/` is a fourth standalone research note in Chinese (dollar-tide map for US and China tech and dividend baskets: history, eight scenarios, buy and sell zones, buy grid). One self-contained page, not linked from the index.
- `moutai/` and `mindray/` run the same eight scenarios for two single stocks (Kweichow Moutai, Mindray). Each is one self-contained page that shares its script with `tide/`; neither is linked from the index.
