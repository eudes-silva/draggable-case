<script lang="ts" setup>
import { ref } from "vue";
import GridCell from "@/components/GridCell.vue";
import Grid from "@/components/Grid.vue";
import { useMouseInElement } from "@vueuse/core";

const gridItems = ref([
  {
    id: 1,
    startColumn: 1,
    startRow: 1,
    widthCols: 1,
    heightRows: 1,
    bgColor: "bg-green200",
    name: "section 1",
  },
  {
    id: 2,
    startColumn: 2,
    startRow: 1,
    widthCols: 1,
    heightRows: 1,
    bgColor: "bg-orange200",
    name: "section 2",
  },
  {
    id: 3,
    startColumn: 1,
    startRow: 2,
    widthCols: 1,
    heightRows: 1,
    bgColor: "bg-yellow200",
    name: "section 3",
  },
  {
    id: 4,
    startColumn: 2,
    startRow: 2,
    widthCols: 1,
    heightRows: 1,
    bgColor: "bg-red200",
    name: "section 4",
  },
]);

const gridRef = ref(null);
const isAllowedToDragId = ref(null as any);
const draggedItemId = ref(null as any);
const isOverPosition = ref(false);

const gridItemWidth = ref(null as any);
const gridItemHeight = ref(null as any);
const gridItemPositionProperty = ref(null as any);
const xPosition = ref(null as any);
const yPosition = ref(null as any);

function allowDragCell(cell: any) {
  isAllowedToDragId.value = cell.id;
}

function drag(event: any, item: any) {
  draggedItemId.value = item.id;
  isOverPosition.value = false;
  // remove only if statement to remove ghost element --> check another comment in this file
  if (isAllowedToDragId === draggedItemId) {
    const canvas = document.createElement("canvas");
    event.dataTransfer.setDragImage(canvas, 0, 0);
    const { elementWidth, elementHeight } = useMouseInElement(event.target);
    gridItemWidth.value = elementWidth.value;
    gridItemHeight.value = elementHeight.value;
    gridItemPositionProperty.value = "fixed";
    xPosition.value = `${elementX.value - gridItemWidth.value / 2}`;
    yPosition.value = `${elementY.value - gridItemHeight.value / 2}`;
  }
}

const { elementX, elementY } = useMouseInElement(gridRef);

function move(event: any) {
  event.preventDefault();
  // xPosition.value = `${elementX.value - gridItemWidth.value / 2}`; // uncomment this to remove ghost element
  // yPosition.value = `${elementY.value - gridItemHeight.value / 2}`; // uncomment this to remove ghost element
}

function drop(event: any) {
  event.preventDefault();
  isOverPosition.value = true;
}

function getPosition(values: any) {
  const { index, cols } = values;
  gridItems.value = gridItems.value.map((item) => {
    if (item.id === draggedItemId.value) {
      item.startColumn = (index % cols) + 1;
      item.startRow = Math.floor(index / cols) + 1;
    }
    return item;
  });
  draggedItemId.value = null;
  gridItemPositionProperty.value = "";
  isOverPosition.value = false;
}
</script>
<template>
  <Grid
    ref="gridRef"
    :isOverPositionToDrop="isOverPosition"
    :columns="{ 600: 2, 900: 3, 1200: 4, 1600: 5 }"
    :rows="{ 480: 2, 800: 3, 1024: 4, 1200: 5 }"
    @dragover="move($event)"
    @drop="drop($event)"
    @getPosition="getPosition"
  >
    <GridCell
      @mouseover="allowDragCell(item)"
      :draggable="item.id === isAllowedToDragId"
      v-for="item in gridItems"
      :key="item.id"
      :initialColPositionX="item.startColumn"
      :widthInCols="item.widthCols"
      :initialRowPositionY="item.startRow"
      :heightInRows="item.heightRows"
      @dragstart="drag($event, item)"
      :style="{
        width: `${gridItemWidth}px`,
        height: `${gridItemHeight}px`,
        top: `${yPosition}px`,
        left: `${xPosition}px`,
        position: `${
          draggedItemId === item.id ? gridItemPositionProperty : ''
        }`,
      }"
    >
      <div class="w-full h-full p-3 rounded-lg" :class="item.bgColor">
        {{ item.name }}
      </div>
    </GridCell>
  </Grid>
</template>
