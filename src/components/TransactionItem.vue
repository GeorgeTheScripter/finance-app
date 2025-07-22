<template>
  <div :class="`p-4 rounded-xl ${itemColor} flex flex-col gap-3`">
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <p class="text-2xl font-medium">{{ transaction.amount }} ₽</p>
        <p class="text-sm text-gray-500">{{ date }}</p>
      </div>

      <p class="text-base text-gray-500">{{ transaction.description }}</p>
    </div>

    <div class="flex justify-between items-center">
      <div
        :class="`px-4 py-2 rounded-xl text-sm`"
        :style="{ backgroundColor: transaction.category.color }"
      >
        {{ transaction.category.title }}
      </div>
      <Button
        class="px-4 py-2 bg-red-400 text-white text-sm"
        @click="transactions.methods.removeTransaction(transaction.id)"
        >Удалить</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "@/utils/formatDate";
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

const date = formatDate(props.transaction.date);
</script>
