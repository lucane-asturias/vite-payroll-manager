<script setup>
  import { onMounted, computed } from "vue"
  import { auth } from '@/utils/firebase'
  import { useAuthStore } from "@/modules/auth/store/authStore"
  import AppAuth from "@/modules/auth/views/Auth.vue"

  const authStore = useAuthStore()

  const isUserLoggedIn = computed(() => authStore.isUserLoggedIn)

  onMounted(() => authStore.initLogin())
</script>

<template>

  <template v-if="isUserLoggedIn">
    <!-- will be replaced and loaded with the correct component based on route records -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <!-- will render whatever component is provided by the router view -->
        <component :is="Component"></component>
      </transition>
    </router-view>
  </template>

  <app-auth v-else />
  
</template>

<style>
  /*  gets added when the element is entering the page */
  .fade-enter-from {
    opacity: 0;
  }
  /* gets added for the entirety of the animation. */
  .fade-enter-active {
    transition: all 0.2s linear;
  }
  /* gets added when leaving the document */
  .fade-leave-to {
    transition: all 0.2s linear;
    opacity: 0;
  }

</style>