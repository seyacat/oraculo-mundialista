<template>
  <div class="home">
    <SignedOut>
      <div class="login-container">
        <h1 class="title">El Oráculo Mundial</h1>
        <p class="subtitle">No solo predices el Mundial. Lo juegas contra tu gente.</p>
        <SignIn :afterSignInUrl="'/dashboard'" />
      </div>
    </SignedOut>
    <SignedIn>
      <RouterLink to="/dashboard">Ir al Dashboard →</RouterLink>
    </SignedIn>
  </div>
</template>

<script setup>
import { SignIn, SignedIn, SignedOut } from '@clerk/vue'
</script>

<style scoped>
.home {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.login-container {
  width: 100%;
  max-width: 400px;
  text-align: center;
}
.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.subtitle {
  font-size: 1rem;
  opacity: 0.7;
  margin-bottom: 2rem;
}
</style>
