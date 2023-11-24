<script lang="ts" setup>
interface Props {
  width?: number;
  height?: number;
  initialColPositionX?: number;
  initialRowPositionY?: number;
}

withDefaults(defineProps<Props>(), {
  width: 1,
  height: 1,
  initialColPositionX: 1,
  initialRowPositionY: 1,
});
</script>
<template>
  <div
    class="w-full h-full rounded-lg overflow-hidden"
    :style="{
      /*grid-area property specifies where to place a grid item(columns in x-axis and rows in y-axis). 
      its a shorthand for grid-row-start / grid-column-start / grid-row-end / grid-column-end (start and end are lines/gaps in grid)
      grid-area syntax:  start row line / start column line / end row line / start row line 
      min css function syntax: min(smallest value between the parameters - relative or fixed values)
      css var function syntax: var(get here css variables, fallback value)
      */
      gridArea: ` 
      min(${initialRowPositionY}, var(--rows,1)) / 
      min(${initialColPositionX}, var(--columns,1)) / 
      span min(${height}, var(--rows,1)) / 
      span min(${width}, var(--columns,1))`,
    }"
  >
    <slot />
  </div>
</template>
