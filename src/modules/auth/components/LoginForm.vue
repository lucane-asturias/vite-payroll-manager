<script setup>
  import { reactive } from 'vue'
  import { useLogin } from '../composables/useLogin'

  const loginSchema = reactive({
    email: 'required|email',
    password: 'required|min:3|max:32',
  })

  const { 
    login_alert_color, 
    login_alert_msg,
    login_in_submission, 
    login_loading,
    login_show_alert, 
    
    onLogin 
  } = useLogin()
</script>

<template>
  <vee-form :validation-schema="loginSchema" @submit="onLogin">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login.email') }}</label>
      <vee-field type="email" name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-green-900 rounded"
        :placeholder="$t('login.enter_email')" />
       <ErrorMessage class="text-lg text-red-300" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login.password') }}</label>
      <vee-field type="password" name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-green-900 rounded"
        :placeholder="$t('login.password')" />
        <ErrorMessage class="text-lg text-red-300" name="password" />
    </div>
    <button type="submit" :disabled="login_in_submission"
      class="block w-full bg-green-600 hover:bg-green-700 text-white mt-6 py-1.5 px-3 rounded transition">
      <i v-if="login_loading" class="fas fa-spinner fa-spin mr-1" /> 
      {{ $t('login.submit') }}
    </button>
  </vee-form>
  <div class="text-white text-center font-bold mt-6 p-3 mb-4 rounded" v-if="login_show_alert" :class="login_alert_color">
    {{ login_alert_msg }}        
  </div>
</template>
