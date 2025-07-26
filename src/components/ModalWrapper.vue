<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
    @click.self="$emit('close')"
  >
    <div
      class="w-full max-w-md bg-white rounded-t-xl shadow-lg p-4 pb-6 pt-10 transition-all duration-300"
      :class="{
        'transform translate-y-0': isVisible,
        'transform translate-y-full': !isVisible,
      }"
    >
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-red-500"
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
