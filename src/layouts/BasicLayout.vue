<template>
  <div class="basic-layout" :class="apply_bg ? 'authentication-bg' : ''">
    <NavbarMenu />

    <div class="container mx-auto overflow-auto">
      <slot />
    </div>

  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useAuthStore } from '@/modules/auth/store/authStore'
  import NavbarMenu from '../components/NavbarMenu.vue'

  const authStore = useAuthStore()

  const apply_bg = computed(() => authStore.applyBg)
</script>

<style>
.authentication-bg {
  background: rgb(4, 78, 157);
  background: linear-gradient(
    0deg,
    rgba(4, 78, 157, 1) 0%,
    rgba(0, 174, 255, 1) 100%
  );
}
</style>