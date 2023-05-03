<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useChangeEmail } from '../composables/useChangeEmail'

  const changeEmailSchema = reactive({
    email: 'required|min:3|max:60|email',
    password: 'required|min:3|max:32',
  })

  const { 
    change_email_alert_color,
    change_email_alert_msg,
    change_email_in_submission,
    change_email_loading,
    change_email_show_alert,

    onChangeEmail
  } = useChangeEmail()
</script>

<template>
  <div class="text-white text-center font-bold p-5 mb-4 rounded" v-if="change_email_show_alert" :class="change_email_alert_color">
    {{ change_email_alert_msg }}        
  </div>
  <vee-form :validation-schema="changeEmailSchema" @submit="onChangeEmail">
    <!-- Change Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Nuevo email</label>
      <vee-field type="text" name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-green-900 rounded"
        placeholder="Enter nuevo email"
      />
      <ErrorMessage class="text-lg text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label for="" class="inline-block-mb-2">Contraseña</label>
      <vee-field type="password" name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-green-900 rounded"
        placeholder="Contraseña actual"
      />
      <ErrorMessage class="text-lg text-red-600" name="password" />
    </div>
    <button type="submit" :disabled="change_email_in_submission"
      class="block w-full bg-green-600 hover:bg-green-700 text-white mt-6 py-1.5 px-3 rounded transition">
      <i v-if="change_email_loading" class="fas fa-spinner fa-spin mr-1" /> 
      Atualizar
    </button>
  </vee-form>
</template>