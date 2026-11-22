# Publish to the Chrome Web Store

This guide covers the first public Chrome Web Store release of Convert to USD. Complete every item before submitting; Chrome reviews the extension package, the store listing, its permissions, and its privacy disclosures together.

## 1. Create a Chrome Web Store developer account

1. Open the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
2. Register as a developer, accept the Developer Agreement, and pay the one-time registration fee if prompted.
3. Use an email address that will remain actively monitored. Chrome sends review, takedown, and policy notices to that address.

Chrome makes developer registration available only in supported countries and regions. Check the current [registration guidance](https://developer.chrome.com/docs/webstore/register) if the dashboard does not offer registration.

## 2. Prepare the extension package

The Chrome Web Store requires Manifest V3, a description, and extension icons. The source is already Manifest V3, but add the store assets before uploading:

1. Create 48×48 px and 128×128 px PNG extension icons. Use an original design; do not use Google or other third-party marks without permission.
2. Add the icons to the repository, for example under `icons/`, and reference them in `manifest.json`:

   ```json
   "icons": {
     "48": "icons/icon-48.png",
     "128": "icons/icon-128.png"
   }
   ```

3. Update `package.json` so `npm run package` includes the `icons/` files in `convert-to-usd.zip`.
4. Increase the manifest `version` for every upload after the first one. A Chrome Web Store version can never be replaced with the same or a lower version number.
5. Run `npm test`, then load the extension unpacked in Chrome and test a supported amount such as `€1,234.56`, `£120`, and `5,000 JPY`.
6. Run `npm run package`. Upload the resulting ZIP—not a `.crx` or `.pem` file. Ensure `manifest.json` is at the root of the ZIP.

Never upload or commit a `.pem` file. It is a private signing key.

## 3. Prepare listing assets and copy

Chrome requires a 128×128 px store icon and at least one 1280×800 px screenshot. Capture a screenshot that shows a selected foreign-currency amount and the USD result card, with no personal data or unrelated browser extensions visible.

Suggested store listing:

| Field | Value |
| --- | --- |
| Name | Convert to USD |
| Category | Productivity |
| Short description | Convert highlighted foreign-currency amounts to USD from your right-click menu. |
| Detailed description | Highlight a price on a webpage, right-click, and choose Convert to USD. The extension recognises common currency symbols and ISO codes, retrieves the current indicative USD exchange rate on demand, and shows the result beside the selected amount. Bare `$` amounts are intentionally not converted because they are ambiguous. |
| Homepage | `https://github.com/meeshvia/convert-to-usd` |
| Support URL | `https://github.com/meeshvia/convert-to-usd/issues` |
| Privacy policy | `https://github.com/meeshvia/convert-to-usd/blob/main/PRIVACY.md` |

Keep the listing accurate: this extension does not promise bank, card, or cash-exchange rates, and it does not support bare dollar amounts.

## 4. Complete the privacy and permissions disclosures

In the Developer Dashboard's **Privacy** tab, describe the extension's single purpose as: **Convert a user-selected foreign-currency amount to an indicative USD amount.**

Declare data handling accurately:

- The extension does not collect, sell, or share personal or sensitive user data.
- It processes selected text locally to identify an amount and currency.
- Only the recognised currency code is sent to Frankfurter over HTTPS to retrieve an exchange rate.
- It does not use analytics, advertising, tracking, remote code, or conversion-history storage.

Explain the requested permissions if the dashboard asks:

| Permission | Justification |
| --- | --- |
| `contextMenus` | Adds the user-invoked **Convert to USD** item when text is selected. |
| `https://api.frankfurter.dev/*` | Retrieves a USD exchange rate only after the user requests a conversion. |
| Content script on webpages | Displays the conversion result next to the user’s selected amount. It does not read or transmit page contents. |

Review the final manifest and policy answers together before submission. Store disclosures must match the extension's actual behavior and this privacy policy.

## 5. Upload and submit

1. In the Developer Dashboard, select **Add new item**.
2. Upload `convert-to-usd.zip`.
3. Complete the **Store Listing**, **Privacy**, **Distribution**, and **Test instructions** tabs. The extension needs no login or test account; say so in the test instructions.
4. Select the countries where you want the listing visible. Choose deferred publishing if you want to approve publication after review completes.
5. Submit the item for review.

Chrome review time varies. Keep review notices enabled and respond to questions with the implementation details above. For later releases, increment `manifest.json`'s version, upload a new ZIP, and submit that version for review.

## Official references

- [Prepare your extension](https://developer.chrome.com/docs/webstore/prepare)
- [Publish in the Chrome Web Store](https://developer.chrome.com/docs/webstore/publish)
- [Complete your listing information](https://developer.chrome.com/docs/webstore/cws-dashboard-listing)
- [Chrome Web Store best practices](https://developer.chrome.com/docs/webstore/best-practices)
