import { parseCurrency } from "./currency.js"

const MENU_ID = "convert-to-usd"

function installContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: "Convert to USD",
      contexts: ["selection"]
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("Could not create Convert to USD menu:", chrome.runtime.lastError.message)
      }
    })
  })
}

chrome.runtime.onInstalled.addListener(installContextMenu)
chrome.runtime.onStartup.addListener(installContextMenu)
installContextMenu()

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MENU_ID || !tab?.id) return

  const parsed = parseCurrency(info.selectionText ?? "")
  if (!parsed) {
    showResult(tab.id, { error: "Select an amount with a currency symbol or code, such as €45 or 5,000 JPY." })
    return
  }

  try {
    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${parsed.currency}&symbols=USD`
    )
    if (!response.ok) throw new Error(`Rate request failed (${response.status})`)

    const data = await response.json()
    const rate = data.rates?.USD
    if (typeof rate !== "number") throw new Error("No USD rate returned")

    showResult(tab.id, {
      source: parsed,
      usd: parsed.amount * rate,
      rate,
      date: data.date
    })
  } catch (error) {
    console.error("Convert to USD:", error)
    showResult(tab.id, { error: "Couldn’t retrieve an exchange rate. Please try again." })
  }
})

function showResult(tabId, payload) {
  chrome.tabs.sendMessage(tabId, { type: "conversion-result", payload }).catch(() => {
    // Browser-internal pages do not load the content script.
  })
}
