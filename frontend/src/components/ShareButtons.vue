<template>
  <div class="share-buttons">
    <a :href="waLink" target="_blank" rel="noopener" class="btn btn-wa">
      <span>💬</span> WhatsApp
    </a>
    <a :href="xLink" target="_blank" rel="noopener" class="btn btn-x">
      <span>𝕏</span> Twitter/X
    </a>
    <a :href="tgLink" target="_blank" rel="noopener" class="btn btn-tg">
      <span>✈️</span> Telegram
    </a>
    <a :href="fbLink" target="_blank" rel="noopener" class="btn btn-fb">
      <span>👤</span> Facebook
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
  const top5 = props.prediction.slice(0, 5).map((t, i) => `${i + 1}. ${t.flag} ${t.name}`).join(' ')
  return `Mi predicción del Mundial: ${top5}... ¿Me ganás? 🔮`
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
  gap: 0.75rem;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  color: #fff;
  min-height: 52px;
}
.btn-wa  { background: #25D366; }
.btn-x   { background: #000; }
.btn-tg  { background: #229ED9; }
.btn-fb  { background: #1877F2; }
</style>
