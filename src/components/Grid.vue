<script lang="ts" setup>
import { ref, computed } from "vue";
import { useElementSize } from "@vueuse/core";

type Size = {
  [key: number]: number;
};

interface Props {
  columns: Size;
  rows: Size;
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => ({ 600: 2, 900: 3, 1200: 4, 1600: 5 }),
  rows: () => ({ 480: 2, 800: 3, 1024: 4, 1200: 5 }),
});

const grid = ref(null);
const { width, height } = useElementSize(grid);

const cols = computed(() => {
  const config = Object.entries(props.columns)
    .map(([key, value]) => [+key, value])
    .findLast(([key]) => width.value > key);
  return config?.[1] || 1;
});
const rows = computed(() => {
  const config = Object.entries(props.rows)
    .map(([key, value]) => [+key, value])
    .findLast(([key]) => height.value > key);
  return config?.[1] || 1;
});
const children = computed(() => Array(cols.value * rows.value).fill(0));
</script>

<template>
  <div ref="grid" class="h-100vh overflow-hidden">
    <div
      class="grid grid-template gap-3 p-3 w-full h-full bg-blue overflow-hidden pointer-events-none"
    >
      <div
        v-for="(_, index) in children"
        :key="index"
        class="bg-white/10 rounded-lg pointer-events-none"
      ></div>
    </div>
    <div
      class="grid grid-template absolute top-0 left-0 w-full h-full gap-3 p-3 overflow-hidden"
    >
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.grid-template {
  grid-template-columns: repeat(v-bind(cols), minmax(0, 1fr));
  grid-template-rows: repeat(v-bind(rows), minmax(0, 1fr));
}
</style>
