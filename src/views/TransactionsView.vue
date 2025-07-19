<template>
  <div>
    <div class="p-4 fixed w-full bg-white">
      <h3 class="text-3xl">Транзакции</h3>
    </div>

    <div class="p-4">
      <Button
        class="fixed bottom-[100px] right-4 left-4"
        v-if="!isPopupVisible"
        @click="openPopup"
        >Добавить</Button
      >

      <TransactionModal v-if="isPopupVisible">
        <TransactionsForm @close="closePopup" />
      </TransactionModal>

      <div class="flex flex-col gap-2 pt-[80px] pb-[148px]">
        <TransactionItem
          v-for="transaction in transactions.transactions"
          :key="transaction.id"
          :transaction="transaction"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from "@/store/useTransactionStore";
import TransactionsForm from "@/components/TransactionsForm.vue";
import TransactionItem from "@/components/TransactionItem.vue";
import { ref } from "vue";
import TransactionModal from "@/components/TransactionModal.vue";

const transactions = useTransactionStore();
const isPopupVisible = ref<boolean>(false);

const openPopup = () => {
  if (!isPopupVisible.value) {
    isPopupVisible.value = true;
  }
};

const closePopup = () => {
  if (isPopupVisible.value) {
    isPopupVisible.value = false;
  }
};
</script>
