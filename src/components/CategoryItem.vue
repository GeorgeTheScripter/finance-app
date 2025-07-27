<template>
  <div
    class="rounded-xl py-2 px-4 text-xl flex justify-between"
    :style="{ backgroundColor: category.color }"
  >
    <p>{{ category.title }}</p>
    <div class="flex gap-2">
      <Button class="bg-green-600 py-1 px-2" @click="selectCategory"
        ><img :src="SettingsIcon" class="w-[24px]" alt="filter"
      /></Button>
      <Button class="bg-red-600 py-1 px-2" @click="deleteCategory"
        ><img :src="DeleteIcon" class="w-[24px]" alt="filter"
      /></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsIcon from "@/assets/micro-icons/settings.svg";
import DeleteIcon from "@/assets/micro-icons/delete.svg";
import { Category } from "@/types/transactions";

const props = defineProps<{
  category: Category;
}>();

const emit = defineEmits<{
  (e: "select", category: Category): void;
  (e: "delete", id: number): void;
}>();

const selectCategory = () => {
  emit("select", props.category);
};

const deleteCategory = () => {
  emit("delete", props.category.id);
};
</script>
