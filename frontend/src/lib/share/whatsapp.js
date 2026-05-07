export function buildWhatsAppShareUrl(message) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

export function shareViaWhatsApp(message) {
  const url = buildWhatsAppShareUrl(message)

  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return url
}

export async function shareNativeOrWhatsApp({ title, text, url } = {}) {
  const message = [text, url].filter(Boolean).join('\n')

  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text, url })
      return { method: 'native', url: null }
    } catch (error) {
      if (error?.name === 'AbortError') {
        return { method: 'native-aborted', url: null }
      }
    }
  }

  return { method: 'whatsapp', url: shareViaWhatsApp(message) }
}
