<template>
  <div>
    <canvas ref="refElement"></canvas>
  </div>
</template>

<script setup lang="ts">
import { DataItem } from "@/types/transactions";
import { Chart, ChartItem } from "chart.js/auto";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps<{
  data: DataItem[];
}>();

const refElement = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const initChart = () => {
  if (!refElement.value) {
    return;
  }

  const context = refElement.value.getContext("2d");

  if (!context) {
    return;
  }

  chartInstance = new Chart(context as ChartItem, {
    type: "doughnut",
    data: {
      labels: props.data.map((row) => row.category),
      datasets: [
        {
          data: props.data.map((row) => row.count),
          backgroundColor: props.data.map((row) => row.color),
          // borderWidth: 10,
          offset: 20,
          borderRadius: 10,
        },
      ],
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: 15,
            },
            padding: 20,
            boxWidth: 20,
            usePointStyle: true,
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
