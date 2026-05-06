<template>
  <div class="share-buttons">
    <a :href="waLink" target="_blank" rel="noopener" class="btn btn-wa">
      <span aria-hidden="true">WA</span> WhatsApp
    </a>
    <a :href="xLink" target="_blank" rel="noopener" class="btn btn-x">
      <span aria-hidden="true">X</span> Twitter/X
    </a>
    <a :href="tgLink" target="_blank" rel="noopener" class="btn btn-tg">
      <span aria-hidden="true">TG</span> Telegram
    </a>
    <a :href="fbLink" target="_blank" rel="noopener" class="btn btn-fb">
      <span aria-hidden="true">FB</span> Facebook
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  prediction: {
    type: Array,
    default: () => [],
  },
})

const shareText = computed(() => {
  if (!props.prediction.length) {
    return 'Estoy jugando El Oráculo Mundial. ¡Únete a mi comunidad y compite conmigo!'
  }
  const top5 = props.prediction.slice(0, 5).map((t, i) => `${i + 1}. ${t.code} ${t.name}`).join(' ')
  return `Mi predicción del Mundial: ${top5}... ¿Me ganas?`
})

const encodedText = computed(() => encodeURIComponent(shareText.value))
const waLink = computed(() => `https://wa.me/?text=${encodedText.value}`)
const xLink = computed(() => `https://x.com/intent/tweet?text=${encodedText.value}`)
const tgLink = computed(() => `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodedText.value}`)
const fbLink = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText.value}`)
</script>

<style scoped>
.share-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 52px;
  border: 1px solid rgba(149, 211, 192, 0.14);
  border-radius: var(--radius-md);
  padding: 0.85rem 0.8rem;
  background: rgba(17, 28, 45, 0.72);
  font-weight: 800;
  font-size: 0.9rem;
  text-decoration: none;
  color: var(--text);
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.btn:hover {
  border-color: rgba(210, 241, 0, 0.42);
  background: rgba(31, 42, 60, 0.9);
  color: var(--text);
  transform: translateY(-1px);
}

.btn span {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: var(--energy-text);
  font-size: 0.68rem;
  font-weight: 900;
}

.btn-wa span { background: #25d366; }
.btn-x span { background: #ffffff; color: #050505; }
.btn-tg span { background: #229ed9; }
.btn-fb span { background: #1877f2; }

@media (max-width: 420px) {
  .share-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
