import { Goal } from "@/types/transactions";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGoals = defineStore("goals", () => {
  const LOCAL_STORAGE_KEY = "goals";
  const goals = ref<Goal[]>([]);
  const acceptedGoals = ref<Goal[]>([]);

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedData) {
      const parseData = JSON.parse(savedData);
      goals.value = parseData.map((goal: Goal) => ({
        ...goal,
        id: Number(goal.id),
        currentSum: Number(goal.currentSum),
        destinationSum: Number(goal.destinationSum),
      }));
    } else {
      goals.value = [];
    }
  };

  loadFromLocalStorage();

  const saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(goals.value));
  };

  const addGoal = (newGoal: Goal) => {
    if (newGoal) {
      goals.value.push(newGoal);
    }

    saveToLocalStorage();
  };

  const removeGoal = (id: number) => {
    goals.value.filter((goal: Goal) => goal.id !== id);
    saveToLocalStorage();
  };

  return {
    goals,
    acceptedGoals,
    addGoal,
    removeGoal,
  };
});
