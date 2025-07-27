import { Category, CATEGORY_TYPE } from "@/types/transactions";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoriesStore = defineStore("categories", () => {
  const categories = ref<Category[]>([
    {
      id: 1,
      title: "Зарплата",
      type: CATEGORY_TYPE.INC,
      color: "#9ACD32",
    },
    { id: 2, title: "Находка", type: CATEGORY_TYPE.INC, color: "#D8BFD8" },
    { id: 3, title: "Кража", type: CATEGORY_TYPE.INC, color: "#A9A9A9" },
    { id: 4, title: "Подарок", type: CATEGORY_TYPE.INC, color: "#FFB6C1" },
    {
      id: 5,
      title: "Спекуляции",
      type: CATEGORY_TYPE.INC,
      color: "#9370DB",
    },

    { id: 6, title: "КУ", type: CATEGORY_TYPE.EXP, color: "#87CEEB" },
    { id: 7, title: "Такси", type: CATEGORY_TYPE.EXP, color: "#F4A460" },
    {
      id: 8,
      title: "Продукты",
      type: CATEGORY_TYPE.EXP,
      color: "#98FB98",
    },
    {
      id: 9,
      title: "Маркетплейс",
      type: CATEGORY_TYPE.EXP,
      color: "#40E0D0",
    },
    {
      id: 10,
      title: "Ресторан",
      type: CATEGORY_TYPE.EXP,
      color: "#FFA07A",
    },
    { id: 11, title: "Дом", type: CATEGORY_TYPE.EXP, color: "#D2B48C" },
    { id: 12, title: "Одежда", type: CATEGORY_TYPE.EXP, color: "#DDA0DD" },
    {
      id: 13,
      title: "Наркотики",
      type: CATEGORY_TYPE.EXP,
      color: "#6A5ACD",
    },
    { id: 14, title: "Аптека", type: CATEGORY_TYPE.EXP, color: "#48D1CC" },
  ]);

  const addCategory = (newCategory: Omit<Category, "id">) => {
    const id: number = categories.value.length + 1;
    console.log(id);
    categories.value.push({
      ...newCategory,
      id: id,
    });
  };

  return {
    categories,
    addCategory,
  };
});
