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
      :class="`w-full flex justify-center px-4 py-2 cursor-pointer bg-gray-300 rounded-xl transition-all duration-200 ${colorClass} peer-checked:text-white`"
      >{{ title }}</label
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  name: string;
  value: string | number;
  checked?: boolean;
  colorClass?: string;
}>();

defineEmits<{
  change: [value: string | number];
}>();
</script>
