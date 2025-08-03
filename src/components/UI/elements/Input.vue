<template>
  <div class="w-full relative">
    <input
      class="py-4 px-4 bg-gray-300 rounded-xl outline-0 w-full"
      type="text"
      :value="modelValue"
      @input="handleInput($event)"
    />

    <div class="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400">
      {{ charCount }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

defineOptions({
  name: "Input",
});

const props = defineProps<{ modelValue: string | number | null }>();

const emit = defineEmits<{
  "update:modelValue": [value: string | number | null];
}>();

const handleInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const charCount = computed(() => {
  if (props.modelValue === null) return 0;
  return String(props.modelValue).length;
});
</script>
