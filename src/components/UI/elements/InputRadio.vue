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
      :class="`w-full flex justify-center px-4 py-2 cursor-pointer rounded-xl transition-all duration-200  ${activeClass}`"
      :style="{ backgroundColor: colorClass }"
      class="label"
      >{{ title }}</label
    >
  </div>
</template>

<script setup lang="ts">
import { RADIO_COLORS } from "@/types/transactions";
import { computed } from "vue";

const props = defineProps<{
  title: string;
  name: string;
  value: string | number;
  checked?: boolean;
  colorClass?: string;
}>();

const activeClass = computed(() => {
  if (props.title === "Доход") {
    return RADIO_COLORS.INCOME;
  } else if (props.title === "Расход") {
    return RADIO_COLORS.EXPENSE;
  }
  return RADIO_COLORS.CATEGORY;
});

defineEmits<{
  change: [value: string | number];
}>();
</script>
