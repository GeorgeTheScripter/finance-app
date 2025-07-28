<template>
  <div
    class="p-3 rounded-xl flex justify-between items-start"
    :class="{
      'bg-green-100': transaction.type === CATEGORY_TYPE.INC,
      'bg-red-100': transaction.type === CATEGORY_TYPE.EXP,
    }"
  >
    <div class="flex flex-col gap-2">
      <p class="text-xl font-medium">{{ transaction.amount }} ₽</p>
      <p class="text-gray-500">{{ date }}</p>
    </div>

    <span
      class="rounded-xl py-1 px-2 w-fit"
      :style="{ backgroundColor: transaction.category.color }"
      >{{ transaction.category.title }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { CATEGORY_TYPE, Transaction } from "@/types/transactions";
import { formatDate } from "@/utils/formatDate";

const props = defineProps<{
  transaction: Transaction;
}>();

const date = formatDate(props.transaction.date);
</script>
