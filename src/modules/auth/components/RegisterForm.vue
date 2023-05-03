<script setup>
  import { reactive } from 'vue'
  import { useRegister } from '../composables/useRegister'

  const defaultUserData = reactive({ language: 'English'  })
  const registerSchema = reactive({
    name: 'required|min:3|max:40|alpha_spaces',
    email: 'required|min:3|max:60|email',
    age: 'required|min_value:18|max_value:100',
    password: 'required|min:3|max:32',
    confirm_password: 'passwords_mismatch:@password',
    language: 'required|language_excluded:Antarctica', // excluded: list of values the input must not match
    tos: 'tos'
  })

  const { 
    reg_alert_color, 
    reg_alert_msg,
    reg_in_submission, 
    reg_loading,
    reg_show_alert, 
    
    onRegister 
  } = useRegister()
</script>

<template>
  <vee-form :validation-schema="registerSchema" 
    @submit="onRegister" :initial-values="defaultUserData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.name') }}</label>
      <vee-field type="text" name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-green-900 rounded"
        :placeholder="$t('register.enter_name')" />
      <!-- will generate span tag if there is error -->
      <ErrorMessage class="text-lg text-red-300" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.email') }}</label>
      <vee-field type="email" name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-green-900 rounded"
        :placeholder="$t('register.enter_email')" />
      <ErrorMessage class="text-lg text-red-300" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.age') }}</label>
      <vee-field type="number" name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-green-900 rounded" 
        :placeholder="$t('register.enter_age')" />
      <ErrorMessage class="text-lg text-red-300" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.password') }}</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-green-900 rounded"
        :placeholder="$t('register.password')" v-bind="field" />
        <!-- Handle multiple errors -->
        <div class="text-lg text-red-300" v-for="error in errors" :key="error">
            {{ error }}
        </div>   
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.confirm_password') }}</label>
      <vee-field type="password" name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-green-900 rounded"
        :placeholder="$t('register.confirm_password')" />
      <ErrorMessage class="text-lg text-red-300" name="confirm_password" />
    </div>
    <!-- Language -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.language') }}</label>
      <vee-field as="select" name="language"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-green-900 rounded">
        <option value="es">{{ $t('register.language') }}</option>
        <!-- <option value="pt">Português</option>
        <option value="es">Espanol</option>
        <option value="ja">日本語</option>
        <option value="zh">中文</option> -->
        <option value="en">{{ $t('language.en') }}</option>
        <option value="pt">{{ $t('language.pt') }}</option>
        <option value="es">{{ $t('language.es') }}</option>
        <option value="ja">{{ $t('language.ja') }}</option>
        <option value="zh">{{ $t('language.zh') }}</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="text-lg text-red-300" name="language" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field type="checkbox" name="tos" value="1" :validateOnInput="true"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
      <i18n-t class="inline-block" keypath="register.accept" tag="label" scope="global">
        <a class="text-gray-300 hover:text-gray-400" href="#">{{ $t('register.TOS') }}</a>
      </i18n-t>
      <ErrorMessage class="text-lg text-red-300 block" name="tos" />
    </div>
    <button type="submit" :disabled="reg_in_submission"
      class="block w-full bg-green-600 text-white py-1.5 px-3 rounded transition
        hover:bg-green-700">
        <i v-if="reg_loading" class="fas fa-spinner fa-spin mr-1" /> 
        {{ $t('register.submit') }}
    </button>
  </vee-form>
  <div class="text-white text-center font-bold mt-6 p-3 mb-4 rounded" v-if="reg_show_alert" :class="reg_alert_color">
    {{ reg_alert_msg }}              
  </div>
</template>
