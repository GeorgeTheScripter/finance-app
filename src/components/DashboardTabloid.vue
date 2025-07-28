<template>
  <div
    :class="`text-black rounded-xl ${color} py-4 px-4 flex flex-col gap-10 items-center h-fit w-full`"
    @click="openModal"
  >
    <div class="flex flex-col items-center">
      <p class="text-xl">{{ title }}</p>
      <h4 class="text-3xl font-medium">{{ sum }} ₽</h4>
    </div>

    <!-- <DashboardChart class="w-[300px]" :data="data" /> -->
  </div>
</template>

<script setup lang="ts">
import { DataItem } from "@/types/transactions";

const props = defineProps<{
  color: string;
  title: string;
  sum: number;
  data: DataItem[];
}>();

const emit = defineEmits<{ (e: "openModal", data: DataItem[]): void }>();

const openModal = () => {
  emit("openModal", props.data);
};
</script>
