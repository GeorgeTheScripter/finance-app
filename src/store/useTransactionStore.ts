import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import {
  Transaction,
  Category,
  RawTransaction,
  CATEGORY_TYPE,
} from "@/types/transactions";

export const useTransactionStore = defineStore("transaction", () => {
  const LOCAL_STORAGE_KEY = "transactions";

  const transactions: Ref<Transaction[]> = ref([]);

  const categories: Ref<Category[]> = ref([
    { id: 1, title: "Зарплата", type: CATEGORY_TYPE.INC },
    { id: 2, title: "Находка", type: CATEGORY_TYPE.INC },
    { id: 3, title: "Кража", type: CATEGORY_TYPE.INC },
    { id: 4, title: "Подарок", type: CATEGORY_TYPE.INC },
    { id: 5, title: "Спекуляции", type: CATEGORY_TYPE.INC },

    { id: 6, title: "Коммунальные услуги", type: CATEGORY_TYPE.EXP },
    { id: 7, title: "Такси", type: CATEGORY_TYPE.EXP },
    { id: 8, title: "Продукты", type: CATEGORY_TYPE.EXP },
    { id: 9, title: "Маркетплейс", type: CATEGORY_TYPE.EXP },
    { id: 10, title: "Ресторан", type: CATEGORY_TYPE.EXP },
    { id: 11, title: "Дом", type: CATEGORY_TYPE.EXP },
    { id: 12, title: "Одежда", type: CATEGORY_TYPE.EXP },
    { id: 13, title: "Наркотики", type: CATEGORY_TYPE.EXP },
    { id: 14, title: "Аптека", type: CATEGORY_TYPE.EXP },
  ]);

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedData) {
      const parseData = JSON.parse(savedData);
      transactions.value = parseData.map((transaction: RawTransaction) => ({
        ...transaction,
        date: new Date(transaction.date),
      }));
    } else {
      transactions.value = [];
    }
  };

  loadFromLocalStorage();

  const saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions.value));
  };

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

  return {
    transactions,
    categories,

    methods: {
      addTransaction,
      removeTransaction,
      editTransaction,
    },
  };
});
