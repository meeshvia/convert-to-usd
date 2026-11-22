# Convert to USD

A small Chrome-compatible extension that converts a highlighted foreign-currency amount to US dollars. Select a price on a webpage, right-click, and choose **Convert to USD**.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## What it does

- Works in Chrome and [Dia](https://www.diabrowser.com/)
- Recognises common currency symbols and ISO codes, including `€`, `£`, `¥`, `₹`, `EUR`, `GBP`, `JPY`, `CAD`, and `AUD`
- Fetches an exchange rate only when you choose the conversion command
- Shows the USD result beside the selected amount

The extension does not guess a bare `$` price: it could be USD, CAD, AUD, or another dollar-based currency. Select an amount labelled with a specific symbol or ISO code instead, for example `CA$99.99` or `99.99 CAD`.

## Install from GitHub

This extension is not yet published in the Chrome Web Store, so install it locally from its source files.

1. Download this repository: select **Code** → **Download ZIP**, then unzip it.
2. Open your browser’s extensions page:
   - Chrome: enter `chrome://extensions` in the address bar.
   - Dia: enter `chrome://extensions` in the address bar.
3. Turn on **Developer mode**.
4. Select **Load unpacked**.
5. Choose the unzipped `convert-to-usd` folder—the folder containing `manifest.json`.
6. On an ordinary webpage, highlight a supported foreign-currency amount, right-click it, and select **Convert to USD**. Dia may place this item in an **Extensions** submenu.

### Use it in multiple Dia profiles

Dia treats extensions as profile-specific. Switch to each profile and repeat steps 2–5, choosing the same unzipped folder each time. You do not need to make copies of the extension.

### Update it

Pull or download the latest source files, then open `chrome://extensions` in each profile and click the extension’s **Reload** button. Refresh any page you already had open.

## Privacy and exchange rates

When you select **Convert to USD**, the extension sends the source currency code—not the selected page content—to [Frankfurter](https://www.frankfurter.app/) to retrieve the latest USD exchange rate. It does not collect, store, or transmit browsing history or page contents.

Rates are indicative and may differ from card, bank, or cash-exchange rates.

## Supported input examples

| Selected text | Interpreted as |
| --- | --- |
| `€1,234.56` | 1,234.56 EUR |
| `£120` | 120 GBP |
| `5,000 JPY` | 5,000 JPY |
| `CA$99.99` | 99.99 CAD |
| `1.234,56 EUR` | 1,234.56 EUR |

## Troubleshooting

| Problem | What to try |
| --- | --- |
| The menu item is missing | Confirm the extension is enabled, then click its **Reload** button on `chrome://extensions`. In Dia, also check the **Extensions** submenu in the right-click menu. |
| A page does not show the result | Reload that webpage after installing or reloading the extension. Browser-internal pages such as `chrome://extensions` cannot be converted. |
| The extension cannot identify the price | Select an amount with a recognised currency symbol or three-letter code; bare `$` is intentionally not supported. |
| No rate is returned | Check your internet connection and try again. |

## Development

Requirements: a current version of Node.js.

```sh
npm test
```

To create a local archive for testing or sharing:

```sh
npm run package
```

Do not commit generated `.zip`, `.crx`, or `.pem` files. A `.pem` file is a private signing key.

## Contributing

Bug reports and small improvements are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

[MIT](LICENSE)
