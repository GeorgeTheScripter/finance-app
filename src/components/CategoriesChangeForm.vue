<template>
  <form @submit.prevent="submit" class="flex flex-col gap-5">
    <div class="flex flex-col gap-2">
      <Input v-model="title" placeholder="Название" type="string" />
      <div class="">
        <h3 class="text-xl font-medium">Выбрать цвет</h3>
        <color-picker @click.stop v-model:pureColor="color" />
      </div>
    </div>

    <Button
      type="submit"
      class="bg-green-600 text-xl font-medium text-white py-3"
      >Сохранить</Button
    >
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
// @ts-ignore
import { ColorInputWithoutInstance } from "tinycolor2";
import { Category } from "@/types/transactions";
import { useCategoriesStore } from "@/store/useCategoriesStore";

const props = defineProps<{
  category: Category;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const store = useCategoriesStore();

const title = ref<string>(props.category.title);
const color = ref<string>(props.category.color);

watch(props.category, (newCategory) => {
  title.value = newCategory.title;
  color.value = newCategory.color;
});

const submit = () => {
  if (title.value !== "" && color.value !== "") {
    store.changeCategory(props.category.id, {
      title: title.value,
      color: color.value,
    });
    emit("close");
  }
};
</script>
