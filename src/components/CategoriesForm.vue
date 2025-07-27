<template>
  <form @submit.prevent class="flex flex-col gap-5">
    <div class="flex flex-col gap-2">
      <Input v-model="categoryName" placeholder="Название" type="string" />
      <div class="">
        <h3 class="text-xl font-medium">Выбрать цвет</h3>
        <color-picker @click.stop v-model:pureColor="pureColor" />
      </div>
    </div>

    <Button
      @click="addCategory"
      type="submit"
      class="bg-green-600 text-xl font-medium text-white py-3"
      >Добавить</Button
    >
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import { ColorInputWithoutInstance } from "tinycolor2";
import { useCategoriesStore } from "@/store/useCategoriesStore";
import { Category, CATEGORY_TYPE } from "@/types/transactions";

const props = defineProps<{
  type: CATEGORY_TYPE;
}>();

const emit = defineEmits<{ (e: "close"): void }>();

const pureColor = ref<string>("red");
const categoryName = ref<string>("");
const store = useCategoriesStore();

const addCategory = () => {
  if (!categoryName.value) {
    alert("Введите название категории");
    return;
  }

  const newCategory: Omit<Category, "id"> = {
    color: pureColor.value,
    title: categoryName.value,
    type: props.type,
  };

  store.addCategory(newCategory);

  emit("close");
};
</script>
