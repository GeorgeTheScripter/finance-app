<template>
  <form @submit.prevent class="flex flex-col gap-6">
    <div class="w-full flex gap-2">
      <InputRadio
        title="Доход"
        name="transactionType"
        :value="CATEGORY_TYPE.INC"
        :checked="selectedType === CATEGORY_TYPE.INC"
        @change="selectedType = $event as CATEGORY_TYPE"
      />
      <InputRadio
        title="Расход"
        name="transactionType"
        :value="CATEGORY_TYPE.EXP"
        :checked="selectedType === CATEGORY_TYPE.EXP"
        @change="selectedType = $event as CATEGORY_TYPE"
      />
    </div>

    <div class="flex flex-col gap-2">
      <Input v-model="inputAmount" placeholder="Сумма" type="number" />
      <Input
        v-model="inputDescription"
        placeholder="Описание (не обязательно)"
      />
    </div>

    <div class="flex flex-col gap-3">
      <div class="flex flex-wrap gap-1">
        <InputRadio
          v-for="category in filteredCategories"
          :key="category.id"
          :title="category.title"
          name="category"
          :value="category.id"
          :checked="categorySelected === category.id"
          @change="categorySelected = +$event"
          :color="category.color"
        />
      </div>
    </div>

    <Button
      @click="addTransaction"
      class="bg-green-600 text-xl font-medium text-white py-3"
      >Добавить</Button
    >
  </form>
</template>

<script setup lang="ts">
import { ref, watch, computed, Ref } from "vue";
import { CATEGORY_TYPE, Transaction } from "@/types/transactions";
import { useTransactionStore } from "@/store/useTransactionStore";

import InputRadio from "@/components/UI/elements/InputRadio.vue";

const transactions = useTransactionStore();

const inputAmount: Ref<number | null> = ref(null);

const inputDescription = ref<string>("");

const selectedType = ref<CATEGORY_TYPE>(CATEGORY_TYPE.INC);

const categorySelected = ref<number | null>(null);

const filteredCategories = computed(() => {
  return transactions.categories.filter(
    (category) => category.type === selectedType.value
  );
});

watch(selectedType, () => {
  categorySelected.value = null;
});

const emit = defineEmits<{ (e: "close"): void }>();

const addTransaction = () => {
  if (categorySelected.value === null || inputAmount.value === null) {
    alert("Заполните поля");
    return;
  }

  const category = transactions.categories.find(
    (cat) => cat.id === categorySelected.value
  );

  if (!category) {
    alert("Категория не найдена");
    return;
  }

  const newTransaction: Transaction = {
    id: +new Date(),
    type: selectedType.value,
    amount: Number(inputAmount.value),
    date: new Date(),
    category: category,
    description: inputDescription.value,
  };

  transactions.methods.addTransaction(newTransaction);

  inputAmount.value = 0;
  inputDescription.value = "";
  selectedType.value = CATEGORY_TYPE.INC;
  categorySelected.value = null;
  emit("close");
};
</script>
