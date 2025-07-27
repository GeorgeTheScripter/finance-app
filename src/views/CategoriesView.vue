<template>
  <div class="px-4">
    <div class="fixed w-full bg-white h-[50px] flex items-center">
      <h3 class="text-3xl">Категории</h3>
    </div>

    <div class="pt-[50px] flex flex-col gap-3">
      <div class="flex flex-col gap-2">
        <h3
          class="top-[90px] bg-white z-2 h-[50px] flex items-center text-xl font-bold"
        >
          Доходы
        </h3>
        <div class="flex gap-1 flex-wrap">
          <CategoryItem
            v-for="category in incomeCategories"
            :key="category.id"
            :title="category.title"
            :color="category.color"
          />
          <Button
            @click="chooseType(CATEGORY_TYPE.INC)"
            class="py-2 px-4 rounded-2xl bg-green-600 w-fit text-white text-xl"
            >+</Button
          >
        </div>
      </div>

      <div>
        <h3
          class="top-[90px] bg-white z-2 h-[50px] flex items-center text-xl font-bold"
        >
          Расходы
        </h3>
        <div class="flex gap-1 flex-wrap">
          <CategoryItem
            v-for="category in expenseCategories"
            :key="category.id"
            :title="category.title"
            :color="category.color"
          />
          <Button
            @click="chooseType(CATEGORY_TYPE.EXP)"
            class="py-2 px-4 rounded-2xl bg-green-600 w-fit text-white text-xl"
            >+</Button
          >
        </div>
      </div>
    </div>

    <ModalWrapper :isVisible="modal.isVisible.value" @close="modal.close">
      <CategoriesForm :type="type" @close="modal.close" />
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from "@/store/useCategoriesStore";
import CategoryItem from "@/components/UI/elements/CategoryItem.vue";
import { computed, ref } from "vue";
import { CATEGORY_TYPE } from "@/types/transactions";
import Button from "@/components/UI/elements/Button.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import { useModal } from "@/composables/useModal";
import CategoriesForm from "@/components/CategoriesForm.vue";

const store = useCategoriesStore();
const modal = useModal();
const type = ref<CATEGORY_TYPE>(CATEGORY_TYPE.INC);

const chooseType = (choosenType: CATEGORY_TYPE) => {
  type.value = choosenType;
  modal.open();
};

const incomeCategories = computed(() => {
  return store.categories.filter(
    (category) => category.type === CATEGORY_TYPE.INC
  );
});

const expenseCategories = computed(() => {
  return store.categories.filter(
    (category) => category.type === CATEGORY_TYPE.EXP
  );
});
</script>
