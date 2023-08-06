<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useChangePassword } from '../composables/useChangePassword'

  const changePasswordSchema = reactive({
    password: 'required|min:3|max:32',
    newPassword: 'required|min:3|max:32',
    newPasswordRepeat: 'passwords_mismatch:@newPassword',
  })

  const { 
    change_password_alert_color,
    change_password_alert_msg,
    change_password_in_submission,
    change_password_loading,
    change_password_show_alert,

    onChangePassword
  } = useChangePassword()
</script>

<template>
  <div class="text-white text-center font-bold p-5 mb-4 rounded" v-if="change_password_show_alert" :class="change_password_alert_color">
    {{ change_password_alert_msg }}        
  </div>
  <vee-form :validation-schema="changePasswordSchema" @submit="onChangePassword">
    <!-- Original Password -->
    <div class="mb-3">
      <vee-field type="password" name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-green-900 rounded"
        placeholder="Current password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <!-- New Password -->
    <div class="mb-3">
      <vee-field type="password" name="newPassword"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-green-900 rounded"
        placeholder="New password"
      />
      <ErrorMessage class="text-red-600" name="newPassword" />
    </div>
    <!-- Repeat New Password -->
    <div class="mb-3">
      <vee-field type="password" name="newPasswordRepeat"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-green-900 rounded"
        placeholder="Repeat new password"
      />
      <ErrorMessage class="text-red-600" name="newPasswordRepeat" />
    </div>
    <button type="submit" :disabled="change_password_in_submission"
      class="block w-full bg-green-600 hover:bg-green-700 text-white mt-6 py-1.5 px-3 rounded transition">
      <i v-if="change_password_loading" class="fas fa-spinner fa-spin mr-1" /> 
      Update
    </button>
  </vee-form>
</template>