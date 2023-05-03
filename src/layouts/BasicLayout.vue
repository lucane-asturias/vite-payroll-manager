<template>
  <div class="basic-layout">
    <NavbarMenu />
    <div class="container mx-auto overflow-auto">
      <slot />
    </div>
  </div>
</template>

<script setup>
import NavbarMenu from "../components/NavbarMenu.vue"
</script>

<style>

</style>