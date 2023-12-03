<script lang="ts" setup>
interface Props {
  widthInCols?: number;
  heightInRows?: number;
  initialColPositionX?: number;
  initialRowPositionY?: number;
}

withDefaults(defineProps<Props>(), {
  widthInCols: 1,
  heightInRows: 1,
  initialColPositionX: 1,
  initialRowPositionY: 1,
});
</script>
<template>
  <div
    class="p-2 w-full h-full rounded-lg overflow-hidden"
    :style="{
      /*grid-area property specifies where to place a grid item(columns in x-axis and rows in y-axis). 
      its a shorthand for grid-row-start / grid-column-start / grid-row-end / grid-column-end (start and end are cells in grid)
      grid-area syntax:  start row cell / start column cell / end row cell / end column cell
      min css function syntax: min(smallest value between the parameters - relative or fixed values)
      css var function syntax: var(get here css variables, fallback value)
      */
      gridArea: ` 
      min(${initialRowPositionY}, var(--rows,1)) / 
      min(${initialColPositionX}, var(--columns,1)) / 
      span min(${heightInRows}, var(--rows,1)) / 
      ${widthInCols === -1 ? '-1' : 'span ' + widthInCols}`,
    }"
  >
    <slot></slot>
  </div>
</template>
