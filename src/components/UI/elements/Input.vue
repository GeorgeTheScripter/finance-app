<template>
  <input
    class="py-4 px-4 bg-gray-300 rounded-xl outline-0"
    type="text"
    :value="modelValue"
    @input="handleInput($event)"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: "Input",
});

defineProps<{ modelValue: string | number | null }>();

const emit = defineEmits<{
  "update:modelValue": [value: string | number | null];
}>();

const handleInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
