<template>
  <article class="share-moment glass-card">
    <div>
      <p class="eyebrow">{{ moment.eyebrow }}</p>
      <h3>{{ moment.title }}</h3>
      <p>{{ moment.description }}</p>
    </div>

    <pre>{{ moment.message }}</pre>

    <WhatsAppShareButton
      :label="moment.ctaLabel"
      :title="moment.title"
      :text="moment.message"
      class="moment-share"
    />
  </article>
</template>

<script setup>
import WhatsAppShareButton from './WhatsAppShareButton.vue'

defineProps({
  moment: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.share-moment {
  border-radius: 24px;
  padding: 18px;
  display: grid;
  gap: 16px;
}

h3 {
  margin-top: 8px;
  font-size: clamp(1.35rem, 5vw, 2rem);
  font-weight: 900;
}

p:not(.eyebrow) {
  margin: 10px 0 0;
  color: var(--text-muted);
  line-height: 1.55;
}

pre {
  white-space: pre-wrap;
  margin: 0;
  border: 1px solid rgba(149, 211, 192, 0.14);
  border-radius: 18px;
  padding: 14px;
  background: rgba(4, 14, 31, 0.52);
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.5;
}

.moment-share {
  min-height: 56px;
}
</style>
