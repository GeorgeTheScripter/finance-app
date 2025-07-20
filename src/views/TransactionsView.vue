<template>
  <div>
    <div class="p-4 fixed w-full bg-white">
      <h3 class="text-3xl">Транзакции</h3>
    </div>

    <div class="p-4">
      <Button
        class="fixed bottom-[100px] right-4 left-4 py-4 bg-green-600 text-xl font-medium text-white"
        v-if="!modal.isVisible.value"
        @click="modal.open"
        >Добавить</Button
      >

      <TransactionModal :isVisible="modal.isVisible.value" @close="modal.close">
        <TransactionsForm @close="modal.close" />
      </TransactionModal>

      <div class="flex flex-col gap-2 pt-[80px] pb-[148px]">
        <div v-for="(group, dateGroup) in groupedTransactions" :key="dateGroup">
          <h3 class="text-xl font-bold mb-2 sticky top-16 bg-white py-2 z-10">
            {{ dateGroup }}
          </h3>

          <div class="flex flex-col gap-2">
            <TransactionItem
              v-for="transaction in group"
              :key="transaction.id"
              :transaction="transaction"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from "@/store/useTransactionStore";
import TransactionsForm from "@/components/TransactionsForm.vue";
import TransactionItem from "@/components/TransactionItem.vue";
import TransactionModal from "@/components/TransactionModal.vue";
import { useModal } from "@/composables/useModal";
import { computed } from "vue";
import { Transaction } from "@/types/transactions";
import { formatGroupDate } from "@/utils/formatDate";

const transactions = useTransactionStore();
const modal = useModal();

const groupedTransactions = computed(() => {
  const groups: Record<string, Transaction[]> = {};

  transactions.transactions.forEach((transaction) => {
    const groupKey = formatGroupDate(transaction.date);

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(transaction);
  });

  return Object.fromEntries(
    Object.entries(groups).sort(([keyA], [keyB]) => {
      const order: any = { Сегодня: 0, Вчера: 1 };
      return (order[keyA] ?? 2) - (order[keyB] ?? 2);
    })
  );
});
</script>
