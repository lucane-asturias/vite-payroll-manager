<template>
  <BasicLayout>
    <div class="flex justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <p>Welcome</p>

      <div v-if="showLogin">
        <h2>Login</h2>
        <login-form />

        <p>No account yet? 
          <span class="pointer fw-bold" @click="toggleAuth">
            Register
          </span> instead
        </p>
      </div>

      <div v-else>
        <h2>Register</h2>
        <register-form />

        <p>Already registered? 
          <span class="pointer fw-bold" @click="toggleAuth">
            Login
          </span> instead
        </p>
      </div>

    </div>
  </BasicLayout>
</template>

<script setup>
  import { defineAsyncComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'

  import { useAuthStore } from '@/modules/auth/store/authStore'
  import BasicLayout from '@/layouts/BasicLayout.vue'

  const authStore = useAuthStore()
  const router = useRouter()

  // async auth components
  const LoginForm = defineAsyncComponent(() => import('../components/LoginForm.vue'))
  const RegisterForm = defineAsyncComponent(() => import('../components/RegisterForm.vue'))

  // auth store
  const toggleAuth = () => authStore.toggleAuth()

</script>

<style lang="scss" scoped>
// .auth {
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background: rgb(4, 78, 157);
//   background: linear-gradient(
//     0deg,
//     rgba(4, 78, 157, 1) 0%,
//     rgba(0, 174, 255, 1) 100%
//   );
// }

span:hover {
  opacity: 0.6;
}
</style>