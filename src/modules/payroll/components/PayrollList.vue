<script lang="ts" setup>
  import { computed } from "vue"
  import { auth, db } from "@/utils/firebase"
  import { useI18n } from 'vue-i18n'
  import { DateTime } from "luxon"

  const { locale } = useI18n({ useScope: 'global' })

  interface Props {
    payrolls?: Array
    getPayrolls: Function
  }

  const props = defineProps<Props>()
    
  const formatDate = (date) => { 
    return DateTime.fromISO(date).setLocale(locale.value).toLocaleString(DateTime.DATE_FULL)
  }

  const deletePayroll = async (id) => {
    try {
      await db.collection(auth.currentUser.uid).doc(id).delete()
      props.getPayrolls()
    } catch (error) {
      console.log(error)
    }
  }

</script>

<template>
  <div class="payroll-list -py-1 px-2 lg:m-5 lg:px-5 border border-gray-200">

    <div
      class="payroll-list__payroll"
      v-for="payroll in payrolls"
      :key="payroll.id"
    >
      <p>{{ formatDate(payroll.dateString) }}</p>
      <div class="action">
        <a :href="payroll.payrollUrl" target="_blank" 
          class="bg-green-600 hover:bg-green-700 text-white hover:text-slate-100 p-3 rounded mr-5">
          {{ $t('payrollList.download') }}
        </a>
        <button @click="deletePayroll(payroll.id)"
          class="bg-red-600 hover:bg-red-700 text-white hover:text-slate-100 p-3 rounded ">
          {{ $t('payrollList.delete') }}
        </button>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.payroll-list {
  &__not-found {
    text-align: center;
    font-size: 20px;
  }

  &__payroll {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;
    padding-top: 7px;

    p {
      margin: 0;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
</style>