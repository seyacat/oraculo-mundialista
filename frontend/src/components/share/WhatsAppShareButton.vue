<template>
  <button type="button" class="whatsapp-button" @click="handleShare">
    <span aria-hidden="true">WA</span>
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Compartir por WhatsApp',
  },
  title: {
    type: String,
    default: 'El Oraculo Mundial',
  },
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    default: '',
  },
})

async function handleShare() {
  const message = [props.text, props.url].filter(Boolean).join('\n')

  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title: props.title,
        text: props.text,
        url: props.url || undefined,
      })
      return
    } catch (error) {
      if (error?.name === 'AbortError') return
    }
  }

  if (typeof window !== 'undefined') {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
.whatsapp-button {
  min-height: 52px;
  width: 100%;
  border: 0;
  border-radius: var(--radius-md);
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #25d366;
  color: #062b16;
  cursor: pointer;
  font-weight: 900;
  transition: transform 180ms ease, filter 180ms ease;
}

.whatsapp-button:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

.whatsapp-button:active {
  transform: scale(0.98);
}

span {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(6, 43, 22, 0.14);
  font-size: 0.72rem;
}
</style>
