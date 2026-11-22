let popup

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "conversion-result") showPopup(message.payload)
})

function showPopup(payload) {
  popup?.remove()
  popup = document.createElement("div")
  popup.setAttribute("role", "status")
  popup.style.cssText = [
    "position:fixed", "z-index:2147483647", "max-width:300px", "padding:12px 14px",
    "border:1px solid rgba(0,0,0,.12)", "border-radius:10px", "background:#fff",
    "box-shadow:0 12px 30px rgba(0,0,0,.2)", "color:#1f2937", "font:14px/1.4 -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif"
  ].join(";")

  if (payload.error) {
    popup.textContent = payload.error
  } else {
    const original = new Intl.NumberFormat(undefined, {
      style: "currency", currency: payload.source.currency
    }).format(payload.source.amount)
    const usd = new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD"
    }).format(payload.usd)
    const converted = document.createElement("strong")
    converted.style.cssText = "display:block;font-size:18px"
    converted.textContent = usd
    const details = document.createElement("span")
    details.textContent = `${original} · rate on ${payload.date}`
    popup.append(converted, details)
  }

  document.documentElement.append(popup)
  positionPopup()
  window.setTimeout(() => popup?.remove(), 8000)
}

function positionPopup() {
  const range = window.getSelection()?.rangeCount ? window.getSelection().getRangeAt(0) : null
  const rect = range?.getBoundingClientRect()
  const margin = 12
  const preferredLeft = rect ? rect.right + margin : window.innerWidth / 2
  const preferredTop = rect && rect.top > popup.offsetHeight + margin
    ? rect.top - popup.offsetHeight - margin
    : (rect?.bottom ?? window.innerHeight / 2) + margin
  const left = Math.min(Math.max(margin, preferredLeft), window.innerWidth - popup.offsetWidth - margin)
  const top = Math.min(Math.max(margin, preferredTop), window.innerHeight - popup.offsetHeight - margin)
  popup.style.left = `${left}px`
  popup.style.top = `${top}px`
}
