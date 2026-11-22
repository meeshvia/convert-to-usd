const SYMBOLS = {
  "A$": "AUD",
  "C$": "CAD",
  "CA$": "CAD",
  "HK$": "HKD",
  "NZ$": "NZD",
  "S$": "SGD",
  "R$": "BRL",
  "€": "EUR",
  "£": "GBP",
  "¥": "JPY",
  "￥": "JPY",
  "₹": "INR",
  "₩": "KRW",
  "₺": "TRY",
  "₽": "RUB",
  "₴": "UAH",
  "₪": "ILS",
  "₫": "VND",
  "₱": "PHP",
  "฿": "THB",
  "zł": "PLN",
  "kr": "SEK"
}

const CODES = new Set([
  "AED", "ARS", "AUD", "BRL", "BGN", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR",
  "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK",
  "NZD", "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY", "UAH", "VND", "ZAR"
])

function parseNumber(value) {
  const compact = value.replace(/[\s']/g, "")
  const comma = compact.lastIndexOf(",")
  const dot = compact.lastIndexOf(".")

  let normalized = compact
  if (comma !== -1 && dot !== -1) {
    normalized = comma > dot
      ? compact.replace(/\./g, "").replace(",", ".")
      : compact.replace(/,/g, "")
  } else if (comma !== -1) {
    const decimals = compact.length - comma - 1
    normalized = decimals === 3 && comma > 0 ? compact.replace(/,/g, "") : compact.replace(",", ".")
  } else if (dot !== -1) {
    const decimals = compact.length - dot - 1
    normalized = decimals === 3 && dot > 0 ? compact.replace(/\./g, "") : compact
  }

  const amount = Number(normalized)
  return Number.isFinite(amount) && amount > 0 ? amount : null
}

function readAmount(text) {
  const match = text.match(/(?:\d{1,3}(?:[,.\s']\d{3})+|\d+)(?:[,.]\d+)?/)
  return match ? parseNumber(match[0]) : null
}

export function parseCurrency(selection) {
  const text = selection.trim().replace(/\u00a0/g, " ")
  const amount = readAmount(text)
  if (!amount) return null

  const codeMatch = text.toUpperCase().match(/\b([A-Z]{3})\b/)
  if (codeMatch && CODES.has(codeMatch[1])) {
    return { amount, currency: codeMatch[1] }
  }

  const symbol = Object.keys(SYMBOLS).sort((a, b) => b.length - a.length).find((candidate) => text.includes(candidate))
  return symbol ? { amount, currency: SYMBOLS[symbol] } : null
}
