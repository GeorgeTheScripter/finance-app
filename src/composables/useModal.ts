import { onMounted, onUnmounted, ref } from "vue";

export const useModal = () => {
  const isVisible = ref<boolean>(false);

  const open = (): void => {
    if (!isVisible.value) {
      isVisible.value = true;
    }
  };

  const close = (): void => {
    if (isVisible.value) {
      isVisible.value = false;
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isVisible.value) {
      close();
    }
  };

  onMounted(() => {
    document.addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
  });

  return {
    isVisible,
    open,
    close,
  };
};
