<script lang="ts" setup>
import { ref, computed } from "vue";
import { useElementSize } from "@vueuse/core";

type Size = {
  [key: number]: number;
};

interface Props {
  columns?: Size;
  rows?: Size;
  isOverPositionToDrop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => ({ 600: 2, 900: 3, 1200: 4, 1600: 5 }),
  rows: () => ({ 480: 2, 800: 3, 1024: 4, 1200: 5 }),
  isOverPositionToDrop: false,
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
  <div ref="grid" class="h-100vh overflow-hidden relative">
    <div
      class="grid w-full h-full bg-blue overflow-hidden"
      :style="{
        gridTemplate: `repeat(${rows}, minmax(0,1fr)) / repeat(${cols}, minmax(0,1fr)) `,
      }"
    >
      <div
        @mouseover="
          isOverPositionToDrop
            ? $emit('getPosition', { index, cols, rows })
            : ''
        "
        v-for="(_, index) in children"
        :key="index"
        class="bg-white/10 border-2 border-dotted rounded-lg m-2"
        :class="isOverPositionToDrop ? 'z-10' : 'pointer-events-none'"
      ></div>
    </div>
    <div
      class="grid w-full h-full absolute top-0 left-0 overflow-hidden"
      :style="{
        /*grid-template property specifies the size of every row in y-axis and every column in x-axis. 
          its a shorthand for grid-template-rows / grid-template-columns
          syntax:  height for each row / width for each column 
          repeat css function syntax: repeat(number of times it should be repeated, what will be repeated)
          minmax syntax: minmax(>= as relative or fixed values, <= as relative or fixed values)
          */
        gridTemplate: `repeat(${rows}, minmax(0,1fr)) / repeat(${cols}, minmax(0,1fr))`,
        '--rows': rows,
        '--columns': cols,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
