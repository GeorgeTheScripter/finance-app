<template>
  <div class="px-4">
    <div class="fixed w-full bg-white h-[50px] flex items-center">
      <h3 class="text-3xl">Категории</h3>
    </div>

    <div class="pt-[50px] pb-[120px] flex flex-col gap-3">
      <div class="flex flex-col gap-2">
        <h3
          class="top-[50px] sticky bg-white z-2 h-[50px] flex items-center text-xl font-bold"
        >
          Доходы
        </h3>
        <div class="flex gap-1 flex-col">
          <CategoryItem
            v-for="category in incomeCategories"
            :key="category.id"
            :category="category"
            @select="selectCategory"
            @delete="onDeleteCategory"
          />

          <Button
            @click="chooseType(CATEGORY_TYPE.INC)"
            class="py-2 px-4 rounded-2xl bg-green-600 w-full text-white text-xl"
            >Добавить</Button
          >
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <h3
          class="top-[50px] sticky bg-white z-2 h-[50px] flex items-center text-xl font-bold"
        >
          Расходы
        </h3>
        <div class="flex gap-1 flex-col">
          <CategoryItem
            v-for="category in expenseCategories"
            :key="category.id"
            :category="category"
            @select="selectCategory"
            @delete="onDeleteCategory"
          />

          <Button
            @click="chooseType(CATEGORY_TYPE.INC)"
            class="py-2 px-4 rounded-2xl bg-green-600 w-full text-white text-xl"
            >Добавить</Button
          >
        </div>
      </div>
    </div>

    <ModalWrapper :isVisible="addModal.isVisible.value" @close="addModal.close">
      <CategoriesForm :type="type" @close="addModal.close" />
    </ModalWrapper>

    <ModalWrapper
      :isVisible="changeModal.isVisible.value"
      @close="changeModal.close"
    >
      <CategoriesChangeForm
        v-if="category"
        :category="category"
        @close="changeModal.close"
      />
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from "@/store/useCategoriesStore";

import { computed, ref } from "vue";
import { Category, CATEGORY_TYPE } from "@/types/transactions";
import Button from "@/components/UI/elements/Button.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import { useModal } from "@/composables/useModal";
import CategoriesForm from "@/components/CategoriesForm.vue";
import SettingsIcon from "@/assets/micro-icons/settings.svg";
import DeleteIcon from "@/assets/micro-icons/delete.svg";
import CategoriesChangeForm from "@/components/CategoriesChangeForm.vue";
import CategoryItem from "@/components/CategoryItem.vue";

const store = useCategoriesStore();
const addModal = useModal();
const changeModal = useModal();
const type = ref<CATEGORY_TYPE>(CATEGORY_TYPE.INC);
const category = ref<Category>();

const selectCategory = (choosenCategory: Category) => {
  category.value = choosenCategory;
  changeModal.open();
};

const chooseType = (choosenType: CATEGORY_TYPE) => {
  type.value = choosenType;
  addModal.open();
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

const onDeleteCategory = (id: number) => {
  store.removeCategory(id);
};
</script>
