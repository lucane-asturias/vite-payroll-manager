<script setup>
  import { reactive, defineAsyncComponent } from 'vue'
  import { useAuthStore } from '../store/authStore'
  import { useAuth } from '../composables/useAuth'

  import BasicLayout from '@/layouts/BasicLayout.vue'

  const LoginForm = defineAsyncComponent(() => import('../components/LoginForm.vue'))
  const RegisterForm = defineAsyncComponent(() => import('../components/RegisterForm.vue'))

  const { changeForm, toggleAuth } = reactive(useAuth())
</script>

<template>
  <BasicLayout>
    <div class="auth text-center text-white">

      <div v-if="changeForm" class="w-80 mt-4">

        <h2 class="tracking-wide">{{ $t('auth.create_account') }}</h2>
        <RegisterForm />

        <h4 class="font-thin">{{ $t('auth.already_registered') }} 
          <span class="cursor-pointer underline font-bold text-gray-300 hover:text-gray-400 hover:opacity-60" @click="toggleAuth">
            {{ $t('auth.login') }}
          </span> {{ $t('auth.instead') }}
        </h4>
      </div>

      <div v-else class="w-80 -mt-10">
        <h4 class="tracking-wider">{{ $t('auth.welcome') }}</h4>
        <h2 class="tracking-wide">{{ $t('auth.login') }}</h2>
        <LoginForm />

        <h4 class="font-thin">{{ $t('auth.no_account') }}
          <span class="cursor-pointer underline font-bold text-gray-300 hover:text-gray-400 hover:opacity-60" @click="toggleAuth">
            {{ $t('auth.register') }}
          </span> {{ $t('auth.instead') }}
        </h4>
      </div>

    </div>
  </BasicLayout>
</template>

<style lang="css">

.auth {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>