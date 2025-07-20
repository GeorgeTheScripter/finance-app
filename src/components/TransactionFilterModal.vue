<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 justify-center z-50"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-xl shadow-lg p-4 pb-6 absolute top-[100px] left-4 right-4"
    >
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isVisible: boolean;
}>();
</script>
