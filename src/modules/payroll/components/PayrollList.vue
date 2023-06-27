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
        <a :href="payroll.payrollUrl" target="_blank" class="ui button positive">
          {{ $t('payrollList.download') }}
        </a>
        <button class="ui button red" @click="deletePayroll(payroll.id)">
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

    p {
      margin: 0;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
</style>