<script setup>
  import { computed } from 'vue'
  import { useAuthStore } from '@/modules/auth/store/authStore'
  import BasicLayout from '@/layouts/BasicLayout.vue'
  import ChangeName from '../components/ChangeName.vue'
  import ChangeEmail from '../components/ChangeEmail.vue'
  import ChangePassword from '../components/ChangePassword.vue'

  const authStore = useAuthStore()
  const user = computed(() => authStore.user)
</script>

<template>
  <div class="account">
    <BasicLayout class="bg-white">
      <h1 class="text-center">Bienvenido a los ajustes</h1>

      <div class="account__section border rounded mx-5 lg:mx-80">
        <p class="title">
          Cambiar nombre
          <span v-if="user.displayName">({{ user.displayName }})</span>
        </p>
        <ChangeName />
      </div>

      <div class="account__section border rounded mx-5 lg:mx-80 my-5">
        <p class="title">
          Cambiar email <span>({{ user.email }})</span>
        </p>
        <ChangeEmail />
      </div>

      <div class="account__section border rounded mx-5 lg:mx-80 my-5">
        <p class="title">Cambiar contraseña</p>
        <ChangePassword />
      </div>
    </BasicLayout>
  </div>
</template>

<style lang="scss" scoped>
.account {
  h1 {
    margin: 50px 0;
    text-align: center;
  }

  &__section {
    position: relative;
    padding: 10px;
    border: 1px solid #16212b;
    padding-top: 25px;
    margin-top: 40px;

    .title {
      position: absolute;
      top: -12px;
      background-color: #16212b;
      color: #fff;
      padding: 2px 10px;
    }
  }
}
</style>