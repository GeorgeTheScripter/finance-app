import { Category, CATEGORY_TYPE } from "@/types/transactions";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoriesStore = defineStore("categories", () => {
  const LOCAL_STORAGE_KEY = "categories";
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

  const saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories.value));
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedData) {
      const parseData = JSON.parse(savedData);
      categories.value = parseData.map((category: Category) => ({
        ...category,
        id: Number(category.id),
      }));
    } else {
      saveToLocalStorage();
    }
  };

  loadFromLocalStorage();

  const addCategory = (newCategory: Omit<Category, "id">) => {
    const maxId = categories.value.reduce(
      (max, cat) => (cat.id > max ? cat.id : max),
      0
    );

    categories.value.push({
      ...newCategory,
      id: maxId + 1,
    });

    saveToLocalStorage();
  };

  const removeCategory = (id: number) => {
    const index = categories.value.findIndex((c) => c.id === id);

    if (index !== -1) {
      categories.value.splice(index, 1);
      saveToLocalStorage();
    }
  };

  const changeCategory = (categoryId: number, changes: Partial<Category>) => {
    const category = categories.value.find((cat) => cat.id === categoryId);
    if (category) {
      Object.assign(category, changes);
      saveToLocalStorage();
    }
  };

  return {
    categories,
    addCategory,
    removeCategory,
    changeCategory,
  };
});
