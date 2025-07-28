import { Goal } from "@/types/transactions";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGoalsStore = defineStore("goals", () => {
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

  const editGoal = (
    goalId: number,
    destinationSum: number,
    title: string,
    description: string
  ) => {
    const goal = goals.value.find((g: Goal) => g.id === goalId);
    if (goal) {
      goal.destinationSum = destinationSum;
      goal.title = title;
      goal.description = description;
      saveToLocalStorage();
    }
  };

  const addToGoal = (goalId: number, amount: number) => {
    const goal = goals.value.find((g: Goal) => g.id === goalId);
    if (goal) {
      goal.currentSum = Number(goal.currentSum) + Number(amount);
      saveToLocalStorage();
    }
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
    addToGoal,
    editGoal,
  };
});
