<script lang="ts" setup>
type Position = { [key: string]: string };

interface Props {
  width: string;
  height: string;
  position: Position;
}

const props = withDefaults(defineProps<Props>(), {
  width: "1",
  height: "1",
  position: () => ({ x: "100px", y: "0" }),
});
const xPosition = props.position.x;
const yPosition = props.position.y;
</script>
<template>
  <div class="gridcell w-full h-full rounded-lg overflow-hidden">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.gridcell {
  grid-column: v-bind(width);
  grid-row: v-bind(height);
  transform: translate(v-bind(xPosition), v-bind(yPosition));
}
</style>
