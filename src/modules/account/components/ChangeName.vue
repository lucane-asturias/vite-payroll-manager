<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useChangeName } from '../composables/useChangeName'

  const changeNameSchema = reactive({
    name: 'required|min:3|max:100|alpha_spaces'
  })

  const { 
    change_name_alert_color,
    change_name_alert_msg,
    change_name_in_submission,
    change_name_loading,
    change_name_show_alert,

    onChangeName
  } = useChangeName()
</script>

<template>
  <div class="text-white text-center font-bold p-5 mb-4 rounded" v-if="change_name_show_alert" :class="change_name_alert_color">
    {{ change_name_alert_msg }}        
  </div>
  <!-- Change Name -->
  <vee-form :validation-schema="changeNameSchema" @submit="onChangeName">
    <div class="mb-3">
      <label class="inline-block mb-2">Nuevo nombre</label>
      <vee-field type="text" name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-green-900 rounded"
        placeholder="Nombre y apellidos" />
      <!-- will generate span tag if there is error -->
      <ErrorMessage class="text-lg text-red-600" name="name" />
    </div>
    <button type="submit" :disabled="change_name_in_submission"
      class="block w-full bg-green-600 hover:bg-green-700 text-white mt-6 py-1.5 px-3 rounded transition">
      <i v-if="change_name_loading" class="fas fa-spinner fa-spin mr-1" />
      Atualizar
    </button>
  </vee-form>
</template>