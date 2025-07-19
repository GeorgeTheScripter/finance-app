<template>
  <div class="p-4">
    <h3 class="text-3xl mb-6">Транзакции</h3>

    <TransactionsForm />

    <div class="flex flex-col gap-1">
      <TransactionItem
        v-for="transaction in transactions.transactions"
        :key="transaction.id"
        :transaction="transaction"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from "@/store/useTransactionStore";
import TransactionsForm from "@/components/TransactionsForm.vue";
import TransactionItem from "@/components/TransactionItem.vue";

const transactions = useTransactionStore();
</script>
