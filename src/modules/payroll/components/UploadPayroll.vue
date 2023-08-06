<script lang="ts" setup>
  import { ref } from 'vue'
  import { v4 as uuidv4 } from 'uuid'
  import { auth, storage, db } from '@/utils/firebase'
  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n({ useScope: 'global' })

  const props = defineProps<{ getPayrolls: Function }>()

  const showForm = ref<boolean>(false)
  const file = ref<null | File>(null)
  const date = ref<null | Date>(null)
  const loading = ref<boolean>(false)
  const error = ref<string>(null)

  const emit = defineEmits(['tempFile'])

  const showCloseForm = () => showForm.value = !showForm.value

  const uploadFile = (e) => {
    if (!e.target.value) {
      file.value = ''
      return
    }

    const tempFile: File = e.target.files[0]
    error.value = null

    if (tempFile.type === 'application/pdf') {
      emit('tempFile', tempFile)
      file.value = tempFile
    } else {
      if (locale.value === 'pt') {
        error.value = 'Arquivo inválido. Carregue uma holerite no formato PDF.'
      } else if (locale.value === 'es') {
        error.value = 'Fichero no valido. Suba un fichero pdf.'
      } else if (locale.value === 'zh') {
        error.value = '文件无效。上传一个PDF文件。'
      } else if (locale.value === 'ja') {
        error.value = 'ファイルが有効ではありません。PDFファイルをアップロードしてください。'
      } else {
        error.value = 'File not valid. Upload a payroll in PDF format.'
      }
    }
  }

  const changeDate = (e) => date.value = e.target.value

  const handleSubmit = async () => {
    if (!file.value && !date.value) { 
      if (locale.value === 'pt') {
        error.value = 'Faça upload da holerite e uma data para o pagamento.'
      } else if (locale.value === 'es') {
        error.value = 'Sube una nomina y selecciona la fecha de la nomina.'
      } else if (locale.value === 'zh') {
        error.value = '上传工资单，选择发薪日期'
      } else if (locale.value === 'ja') {
        error.value = '給与計算をアップロードして、給与支払日を選択する。'
      } else {
        error.value = 'Please, upload a payroll and a date for the payment.'
      }
      return
    }

    loading.value = true

    try {
      const nameFile = uuidv4()
      await storage
        .ref(auth.currentUser.uid)
        .child(`${nameFile}.pdf`)
        .put(file.value)

      const payrollUrl = await storage
        .ref(`${auth.currentUser.uid}/${nameFile}.pdf`)
        .getDownloadURL()

      await db.collection(auth.currentUser.uid).add({
        payrollUrl,
        date: new Date(date.value),
        dateString: date.value,
      })

      props.getPayrolls() // refetch
    } catch (error) {
      console.log(error)
    }

    date.value = null
    error.value = null
    file.value = null
    loading.value = false
    showForm.value = false
    document.getElementById('file').value = ''
    
  }
</script>

<template>
  <div class="upload-payroll">
    <button class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 mb-4 rounded" @click="showCloseForm">
      {{ $t('uploadPayroll.new_payroll') }}
    </button>

    <form
      class="upload-payroll__form"
      :class="{ open: showForm }"
      @submit.prevent="handleSubmit"
    >
      <div class="mb-6">
        <label for="file" class="cursor-pointer bg-gray-300 hover:bg-gray-400 px-2 py-3 rounded">
          <i class="fas fa-file mt-3" />
          {{ $t('uploadPayroll.select_payroll') }}
          <span v-if="file">({{ file.name }})</span>
        </label>
        <input
          type="file"
          id="file"
          style="display: none"
          @change="uploadFile"
        />
      </div>
      <div class="mb-4">
        <div class="ui input left icon">
          <input type="date" @change="changeDate" :value="date" />
        </div>
      </div>

      <button class="bg-green-600 hover:bg-green-700 text-white py-2.5 px-6 rounded">
        <i v-if="loading" class="fas fa-spinner fa-spin mr-1" /> 
        {{ $t('uploadPayroll.upload_payroll') }}
      </button>

      <div class="bg-red-500 text-white text-center font-bold p-2.5 mt-3.5 mb-3.5 rounded" v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.upload-payroll {
  > .ui.button.primary {
    margin-bottom: 30px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;

    &.open {
      height: 200px;
    }
  }
}
</style>