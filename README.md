# Modern Developer Harvesting Links

- For [moderndeveloper](https://moderndeveloper.com/) :zap:

- A tool to harvest links from HTML markups.

- Uses regular expression with [capture groups](app/scripts/harvest.js).

## Demo

[https://cusxio.github.io/moderndeveloper-harvesting-links/]( https://cusxio.github.io/moderndeveloper-harvesting-links/)

## Setup

```bash
$ git clone https://github.com/cusxio/moderndeveloper-harvesting-links.git

$ npm install
```

## Usage

```bash
# For Development
$ npm run start

# Build Production
$ npm run production

# Deploy to GitHub Pages
$ npm run deploy:gh-pages
```

## Lessons Learnt

- regex is not suitable for DOM parsing.
- `exec` is *a little* faster than `replace` - [jsPerf](https://jsperf.com/regex-exec-vs-replace-capture)
- precompile regex to improve performance.

## Built With

[Frontend Init](https://github.com/cusxio/frontend-init)

## License

MIT © Jonathan Chan