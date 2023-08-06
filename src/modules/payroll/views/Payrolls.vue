<script lang="ts" setup>
  import { ref, onMounted } from "vue"
  import { auth, db } from "@/utils/firebase"
  import BasicLayout from "@/layouts/BasicLayout.vue"
  import UploadPayroll from "../components/UploadPayroll.vue"
  import PayrollList from "../components/PayrollList.vue"

  const payrolls = ref(null)
  const tempFile = ref<null | File>(null)

  onMounted(() => getPayrolls())

  const changeFileInfo = (selectedFile) => tempFile.value = selectedFile

  const getPayrolls = async () => {
    const response = await db
      .collection(auth.currentUser.uid)
      .orderBy("date", "desc")
      .get()

    const result = []
    response.docs.forEach((doc) => {
      const data = doc.data()
      data.id = doc.id
      result.push(data)
    })
    payrolls.value = result

    console.log(payrolls.value)
  }
</script>

<template>
  <BasicLayout>
    <div class="payrolls px-5 lg:px-40">
      <h1>{{ $t('payrolls.my_payrolls') }}</h1>
      <UploadPayroll @tempFile="changeFileInfo" :getPayrolls="getPayrolls" />

      <template v-if="payrolls?.length === 0 && !tempFile">
        <p class="payrolls__not-found">
          {{ $t("payrollList.no_payrolls") }}
        </p>
      </template>
      <template v-else>
        <PayrollList :payrolls="payrolls" :getPayrolls="getPayrolls" />
      </template>

    </div>
  </BasicLayout>
</template>

<style lang="scss" scoped>
.payrolls {
  margin: 50px 0;
  text-align: center;

  &__not-found {
    text-align: center;
    font-size: 20px;
  }
}
</style>