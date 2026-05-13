<template>
  <div class="sso-loading">
    <p>Iniciando sesion...</p>
    <AuthenticateWithRedirectCallback />
  </div>
</template>

<script setup>
import { AuthenticateWithRedirectCallback } from '@clerk/vue'
</script>

<style scoped>
.sso-loading {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  color: #f4f7fb;
  background: #020812;
}
</style>
