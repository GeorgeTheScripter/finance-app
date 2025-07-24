<template>
  <div>
    <div class="px-4 fixed z-3 w-full bg-white h-[50px] flex items-center">
      <h3 class="text-3xl">Транзакции</h3>
    </div>

    <div
      class="px-4 fixed z-3 top-[50px] w-full bg-white h-[40px] flex items-center justify-end gap-2"
    >
      <Button class="bg-green-600 py-1 px-2" @click="store.methods.resetFilter"
        ><img :src="ResetIcon" class="w-[24px]" alt="reset"
      /></Button>

      <Button class="bg-green-600 py-1 px-2" @click="modalFilter.open"
        ><img :src="FilterIcon" class="w-[24px]" alt="filter"
      /></Button>
    </div>

    <div class="p-4 pt-[90px] pb-[160px]">
      <div class="flex flex-col gap-2">
        <div
          v-for="(group, dateGroup) in store.groupedTransactions"
          :key="dateGroup"
        >
          <h3
            class="text-xl font-bold sticky top-[90px] bg-white z-2 h-[50px] flex items-center"
          >
            {{ dateGroup }}
          </h3>

          <div class="flex flex-col gap-2 py-[10px]">
            <TransactionItem
              v-for="transaction in group"
              :key="transaction.id"
              :transaction="transaction"
            />
          </div>
        </div>
      </div>

      <Button
        class="fixed z-3 bottom-[100px] right-4 left-4 py-4 bg-green-600 text-xl font-medium text-white"
        v-if="!modalForm.isVisible.value"
        @click="modalForm.open"
        >Добавить</Button
      >
    </div>

    <TransactionModal
      :isVisible="modalForm.isVisible.value"
      @close="modalForm.close"
    >
      <TransactionsForm @close="modalForm.close" />
    </TransactionModal>

    <TransactionFilterModal
      :isVisible="modalFilter.isVisible.value"
      @close="modalFilter.close"
    >
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-5">
          <h4 class="text-xl font-medium">Выберите категории:</h4>

          <div class="flex flex-wrap gap-1">
            <div
              v-for="category in store.categories"
              :key="category.id"
              class="px-4 py-2 rounded-xl"
              :style="getCategoryStyle(category)"
              @click="store.methods.toggleCategory(category.id)"
            >
              {{ category.title }}
            </div>
          </div>
        </div>
      </div>
    </TransactionFilterModal>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from "@/store/useTransactionStore";
import { useModal } from "@/composables/useModal";

import TransactionsForm from "@/components/TransactionsForm.vue";
import TransactionItem from "@/components/TransactionItem.vue";
import TransactionModal from "@/components/TransactionModal.vue";
import TransactionFilterModal from "@/components/TransactionFilterModal.vue";

import FilterIcon from "@/assets/micro-icons/filter.svg";
import ResetIcon from "@/assets/micro-icons/reset.svg";
import { computed } from "vue";
import { Category } from "@/types/transactions";

const store = useTransactionStore();
const modalFilter = useModal();
const modalForm = useModal();

const getCategoryStyle = computed(() => (category: Category) => {
  const isSelected = store.selectedCategoriesIds.includes(category.id);

  return {
    background: isSelected ? "green" : category.color,
    color: isSelected ? "white" : "inherit",
  };
});
</script>
