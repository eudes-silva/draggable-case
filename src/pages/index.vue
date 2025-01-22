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
const isAllowedToDragId = ref<number | null>(null);
const draggedItemId = ref<number | null>(null);
const isOverPosition = ref<boolean>(false);

const gridItemWidth = ref<number | null>(null);
const gridItemHeight = ref<number | null>(null);
const gridItemPositionProperty = ref<string | null>(null);
const xPosition = ref<string | null>(null);
const yPosition = ref<string | null>(null);

interface Cell {
  id: string | number;
  startColumn: string | number;
  startRow: string | number;
  widthCols: string | number;
  heightRows: string | number;
  bgColor: string;
  name: string;  
}

function allowDragCell(cell: Cell) {
  isAllowedToDragId.value = cell.id;
}

function drag(event: Event, item: Cell) {
  draggedItemId.value = item.id;
  isOverPosition.value = false;
  // if statement to remove ghost element --> check another comments about ghost element in this file
  if (isAllowedToDragId.value === draggedItemId.value) {
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

function move(event: Event) {
  event.preventDefault();
  xPosition.value = `${elementX.value - gridItemWidth.value / 2}`; // removes ghost element
  yPosition.value = `${elementY.value - gridItemHeight.value / 2}`; // removes ghost element
}

function drop(event: Event) {
  event.preventDefault();
  isOverPosition.value = true;
}

interface positionValues {
  index: string | number;
  cols: string | number;
  rows: string | number;
}

function getPosition(values: positionValues) {
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
      v-for="item in gridItems"
      :key="item?.id"
      :draggable="item?.id === isAllowedToDragId"
      @mouseover="allowDragCell(item)"
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
          draggedItemId === item?.id ? gridItemPositionProperty : ''
        }`,
      }"
    >
      <div class="w-full h-full p-3 rounded-lg" :class="item.bgColor">
        {{ item.name }}
      </div>
    </GridCell>
  </Grid>
</template>
