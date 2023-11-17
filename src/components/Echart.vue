<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { useEventListener } from "@vueuse/core";

const chartElement = ref(null);

onMounted(() => {
  createChart();
});
function createChart() {
  const chart = echarts.init(chartElement.value);
  chart.setOption({
    title: {
      text: "ECharts Getting Started Example",
    },
    tooltip: {},
    xAxis: {
      data: ["shirt", "cardigan", "chiffon", "pants", "heels", "socks"],
    },
    yAxis: {},
    series: [
      {
        name: "sales",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
  useEventListener(window, "resize", chart.resize);
}
</script>
<template>
  <div ref="chartElement" class="h-full shadow"></div>
</template>
