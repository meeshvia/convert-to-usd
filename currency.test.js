import assert from "node:assert/strict"
import { parseCurrency } from "./currency.js"

assert.deepEqual(parseCurrency("€1.234,56"), { amount: 1234.56, currency: "EUR" })
assert.deepEqual(parseCurrency("£120"), { amount: 120, currency: "GBP" })
assert.deepEqual(parseCurrency("5,000 JPY"), { amount: 5000, currency: "JPY" })
assert.deepEqual(parseCurrency("CA$ 99.99"), { amount: 99.99, currency: "CAD" })
assert.deepEqual(parseCurrency("2,500 kr"), { amount: 2500, currency: "SEK" })
assert.equal(parseCurrency("$40"), null)
assert.equal(parseCurrency("just a number: 40"), null)

console.log("Currency parsing checks passed")
