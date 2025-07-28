<template>
  <div>
    <canvas ref="refElement"></canvas>
  </div>
</template>

<script setup lang="ts">
import { DailyDataItem } from "@/types/transactions";
import { getDaysInMonth } from "@/utils/formatDate";
import { Chart, ChartItem } from "chart.js/auto";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps<{
  data: DailyDataItem[];
  color: string;
}>();

const refElement = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const prepareDataForChart = () => {
  const dayInMonth = getDaysInMonth();
  const labels: string[] = [];
  const data: number[] = [];

  for (let day = 1; day <= dayInMonth; day++) {
    labels.push(day.toString());
    const dailyItem = props.data.find((d) => d.day === day);
    data.push(dailyItem ? dailyItem.amount : 0);
  }

  return {
    labels,
    datasets: [
      {
        label: "Сумма за день",
        data,
        backgroundColor: `${props.color}50`,
        borderColor: props.color,
        borderWidth: 2,
        pointBackgroundColor: props.color,
        pointRadius: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };
};

const initChart = () => {
  if (!refElement.value) {
    return;
  }

  const context = refElement.value.getContext("2d");

  if (!context) {
    return;
  }

  chartInstance = new Chart(context as ChartItem, {
    type: "line",
    data: prepareDataForChart(),

    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          backgroundColor: `${props.color}90`,
          titleFont: { size: 16 },
          bodyFont: { size: 13 },
          padding: 12,
          callbacks: {
            // Форматируем подсказку
            label: (context) => `${context.parsed.y} ₽`,
            title: (context) => `День ${context[0].label}`,
          },
        },
        legend: {
          display: false, // Скрываем легенду
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `${value} ₽`, // Добавляем ₽ к значениям
          },
        },
      },
    },
  });
};

onMounted(initChart);

watch(
  () => props.data,
  () => {
    initChart();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>
