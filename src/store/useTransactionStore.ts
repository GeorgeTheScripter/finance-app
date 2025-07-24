import { defineStore } from "pinia";
import { computed, ref, Ref, ComputedRef } from "vue";
import {
  Transaction,
  Category,
  RawTransaction,
  CATEGORY_TYPE,
} from "@/types/transactions";
import { formatGroupDate } from "@/utils/formatDate";

export const useTransactionStore = defineStore("transaction", () => {
  const LOCAL_STORAGE_KEY = "transactions";

  const transactions: Ref<Transaction[]> = ref([]);
  const selectedCategoriesIds: Ref<number[]> = ref([]);

  const categories: Ref<Category[]> = ref([
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

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedData) {
      const parseData = JSON.parse(savedData);
      transactions.value = parseData.map((transaction: RawTransaction) => ({
        ...transaction,
        date: new Date(transaction.date),
        amount: Number(transaction.amount),
      }));
    } else {
      transactions.value = [];
    }
  };

  loadFromLocalStorage();

  const saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions.value));
  };

  const filteredTransactions: ComputedRef<Transaction[]> = computed(() => {
    if (selectedCategoriesIds.value.length === 0) {
      return transactions.value;
    }

    return transactions.value.filter((transaction) => {
      return selectedCategoriesIds.value.includes(transaction.category.id);
    });
  });

  const addTransaction = (newTrans: Transaction): void => {
    if (newTrans) {
      transactions.value.push(newTrans);
    }

    saveToLocalStorage();
  };

  const removeTransaction = (id: number): void => {
    transactions.value = transactions.value.filter(
      (trans: Transaction): boolean => trans.id !== id
    );

    saveToLocalStorage();
  };

  const editTransaction = (editedTrans: Transaction): void => {
    if (!editedTrans) {
      console.warn(`editedTrans is not defined`);
      return;
    }

    const index = transactions.value.findIndex(
      (trans) => trans.id === editedTrans.id
    );

    if (index === -1) {
      console.warn(`Transaction with id ${editedTrans.id} not found`);
      return;
    }

    transactions.value = [
      ...transactions.value.slice(0, index),
      editedTrans,
      ...transactions.value.slice(index + 1),
    ];

    saveToLocalStorage();
  };

  // Deepseek
  const groupedTransactions = computed(() => {
    const groups: Record<string, Transaction[]> = {};

    filteredTransactions.value.forEach((transaction) => {
      const groupKey = formatGroupDate(transaction.date);
      groups[groupKey] = groups[groupKey] || [];
      groups[groupKey].push(transaction);
    });

    // Преобразуем группы в массив для сортировки
    const groupsArray = Object.entries(groups);

    // Сортируем группы по дате (новые сверху)
    const sortedGroups = groupsArray.sort(([keyA, transA], [keyB, transB]) => {
      // Специальные группы (Сегодня/Вчера)
      const priority: Record<string, number> = {
        Сегодня: 0,
        Вчера: 1,
      };

      // Если оба ключа в приоритете - сортируем по приоритету
      if (keyA in priority && keyB in priority) {
        return priority[keyA] - priority[keyB];
      }

      // Если один из ключей в приоритете - он идет выше
      if (keyA in priority) return -1;
      if (keyB in priority) return 1;

      // Для обычных дат: сравниваем по реальной дате первой транзакции
      const dateA = transA[0].date;
      const dateB = transB[0].date;

      // Сортировка по убыванию (новые даты вверху)
      return dateB.getTime() - dateA.getTime();
    });

    // Преобразуем обратно в объект с сохранением порядка
    return Object.fromEntries(sortedGroups);
  }); // Deepseek

  const toggleCategory = (categoryID: number) => {
    const index = selectedCategoriesIds.value.indexOf(categoryID);

    if (index >= 0) {
      selectedCategoriesIds.value.splice(index, 1);
    } else {
      selectedCategoriesIds.value.push(categoryID);
    }
  };

  const resetFilter = () => {
    selectedCategoriesIds.value = [];
  };

  return {
    transactions,
    categories,
    groupedTransactions,
    selectedCategoriesIds,

    methods: {
      addTransaction,
      removeTransaction,
      editTransaction,
      resetFilter,
      toggleCategory,
    },
  };
});
