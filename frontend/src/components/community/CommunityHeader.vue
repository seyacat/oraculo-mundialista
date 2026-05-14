<template>
  <section class="community-header" data-testid="community-header">
    <div>
      <p class="eyebrow">{{ community.mode || 'Comunidad mundialista' }}</p>
      <h1>{{ community.name }}</h1>
      <p class="summary">{{ community.heroCopy }}</p>
    </div>

    <div class="captain-card glass-card">
      <span class="avatar">{{ initials }}</span>
      <div>
        <strong>{{ community.captain?.name }}</strong>
        <small>{{ community.captain?.title }}</small>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  community: {
    type: Object,
    required: true,
  },
})

const initials = computed(() => {
  const name = props.community.captain?.name || props.community.name || 'OM'
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
})
</script>

<style scoped>
.community-header {
  display: grid;
  gap: 16px;
  padding: 18px;
  border-radius: 28px;
  background:
    linear-gradient(145deg, rgba(21, 32, 49, 0.94), rgba(15, 82, 68, 0.36)),
    radial-gradient(circle at 90% 0%, rgba(210, 241, 0, 0.16), transparent 16rem);
  border: 1px solid rgba(149, 211, 192, 0.16);
}

h1 {
  margin-top: 8px;
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 900;
  letter-spacing: 0;
}

.summary {
  max-width: 620px;
  margin: 12px 0 0;
  color: var(--text-muted);
  line-height: 1.6;
}

.captain-card {
  border-radius: 20px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  border: 2px solid var(--energy);
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: var(--energy);
  font-weight: 900;
}

strong,
small {
  display: block;
}

small {
  margin-top: 3px;
  color: var(--text-muted);
}

@media (min-width: 760px) {
  .community-header {
    grid-template-columns: 1fr auto;
    align-items: end;
    padding: 28px;
  }

  .captain-card {
    min-width: 240px;
  }
}
</style>
