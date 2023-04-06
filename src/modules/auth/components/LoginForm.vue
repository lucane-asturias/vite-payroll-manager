<template>

  <div class="text-white text-center font-bold p-5 mb-4" v-if="login_show_alert" :class="login_alert_color">
    {{ login_alert_msg }}        
  </div>

  <vee-form class="mt-5 mx-auto"
    :class="mdAndUp ? 'w-50' : 'w-75'"
    :validation-schema="loginSchema" @submit="onLogin"
  >
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field name="email"  name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter your username" />
      <ErrorMessage class="text-red-600" name="email" />
    </div>

    <!-- Password -->
    <div class="mb-3">
      <v-text-field type="password" name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter your password" />
      <ErrorMessage class="text-red-600" name="password" />
    </div>

    <v-btn type="submit" :disabled="login_in_submission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >Log in</v-btn>

  </v-form>

</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useLogin } from '../composables/useLogin'

  const loginSchema = reactive({
    email: 'required|email',
    password: 'required|min:3|max:32',
  })

  const { 
    login_in_submission, 
    login_show_alert, 
    login_alert_color, 
    login_alert_msg,
    
    onLogin 
  } = useLogin()

  const onLogin = async () => {
    formError.value = {}
    inSubmission.value = true
    isLoading.value = true

    try {
      await schemaForm.validate(formData.value, { abortEarly: false })

      try {
        const response = await loginApi(formData.value)
        if (!response?.jwt) throw Error('The username or password is not valid.')
        console.log('response', response)
        setTokenApi(response.jwt)

        emit('loginEmit') // emit to redirect user to home page
      } catch (error) {
        console.log('error', error)
      }

    } catch (yupError) {
      inSubmission.value = false
      yupError.inner.forEach((error) => {
        formError.value[error.path] = error.message
      })
    }

    inSubmission.value = false
    isLoading.value = false
    formData.value = {}
  }

</script>

<style scoped>
.input.error {
  border-color: #faa;
  background-color: #ffeded;
}
</style>