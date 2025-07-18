<template>
  <div class="p-4">
    <h3 class="text-3xl mb-6">Transactions</h3>

    <div class="flex flex-col gap-5">
      <div>
        <form @submit.prevent class="flex flex-col gap-6">
          <div class="w-full flex gap-2">
            <InputRadio
              title="income"
              name="transactionType"
              :value="CATEGORY_TYPE.INC"
              :checked="selectedType === CATEGORY_TYPE.INC"
              @change="selectedType = $event"
              :colorClass="RADIO_COLORS.INCOME"
            />
            <InputRadio
              title="expense"
              name="transactionType"
              :value="CATEGORY_TYPE.EXP"
              :checked="selectedType === CATEGORY_TYPE.EXP"
              @change="selectedType = $event"
              :colorClass="RADIO_COLORS.EXPENSE"
            />
          </div>

          <div class="flex flex-col gap-2">
            <Input v-model="inputAmount" placeholder="Sum" type="number" />
            <Input v-model="inputDescription" placeholder="Description" />
          </div>

          <div class="flex flex-col gap-3">
            <h4 class="text-xl">Category</h4>

            <div class="flex flex-wrap gap-1">
              <InputRadio
                v-for="category in filteredCategories"
                :key="category.id"
                :title="category.title"
                name="category"
                :value="category.id"
                :checked="categorySelected === category.id"
                @change="categorySelected = +$event"
                :colorClass="RADIO_COLORS.CATEGORY"
              />
            </div>
          </div>

          <Button>Create transaction</Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from "@/store/useTransactionStore";
import { ref, computed, watch } from "vue";
import Button from "@/components/UI/elements/Button.vue";
import Input from "@/components/UI/elements/Input.vue";
import InputRadio from "@/components/UI/elements/InputRadio.vue";
import { CATEGORY_TYPE, RADIO_COLORS } from "@/types/transactions";

const transactions = useTransactionStore();
const inputAmount = ref<number | null>(null);
const inputDescription = ref<string>("");

const selectedType = ref<string | number>(CATEGORY_TYPE.INC);
const categorySelected = ref<number | null>(null);

const filteredCategories = computed(() => {
  return transactions.categories.filter(
    (category) => category.type === selectedType.value
  );
});

watch(selectedType, () => {
  categorySelected.value = null;
});
</script>
