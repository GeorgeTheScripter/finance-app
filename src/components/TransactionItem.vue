<template>
  <div :class="`p-4 rounded-xl ${itemColor} flex flex-col gap-3`">
    <div class="flex flex-col gap-2">
      <p class="text-2xl font-medium">{{ transaction.amount }} ₽</p>
      <p class="text-xs text-gray-500">{{ transaction.description }}</p>
    </div>

    <div class="flex justify-between items-center">
      <div :class="`px-4 py-2 bg-blue-500 text-white rounded-xl`">
        {{ transaction.category.title }}
      </div>
      <Button @click="transactions.methods.removeTransaction(transaction.id)"
        >X</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from "@/store/useTransactionStore";
import {
  CATEGORY_TYPE,
  Transaction,
  TRANSACTION_ITEM_COLORS,
} from "@/types/transactions";
import { computed } from "vue";

const props = defineProps<{
  transaction: Transaction;
}>();

const itemColor = computed(() => {
  return props.transaction.type === CATEGORY_TYPE.INC
    ? TRANSACTION_ITEM_COLORS.INCOME
    : TRANSACTION_ITEM_COLORS.EXPENSE;
});

const transactions = useTransactionStore();
</script>
