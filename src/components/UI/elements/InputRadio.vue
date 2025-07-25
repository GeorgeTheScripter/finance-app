<template>
  <div>
    <input
      type="radio"
      :id="`${name}-${value}`"
      :name="name"
      :value="value"
      :checked="checked"
      class="absolute opacity-0 w-0 h-0 peer"
      @change="$emit('change', value)"
    />
    <label
      :for="`${name}-${value}`"
      :class="`w-full flex justify-center px-4 py-2 cursor-pointer rounded-xl transition-all duration-200 `"
      :style="getCategoryStyle(checked)"
      class="label"
      >{{ title }}</label
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  name: string;
  value: string | number;
  checked: boolean;
  color?: string;
}>();

defineEmits<{
  change: [value: string | number];
}>();

const getCategoryStyle = computed(() => (checked: boolean) => {
  const bgColor = checked
    ? props.title === "Расход"
      ? "red"
      : "green"
    : props.title === "Доход" || props.title === "Расход"
    ? "#D1D5DC"
    : props.color;

  return {
    background: bgColor,
    color: checked ? "white" : "inherit",
  };
});
</script>
