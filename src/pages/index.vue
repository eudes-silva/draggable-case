<script lang="ts" setup>
import { ref } from "vue";
import GridCell from "@/components/GridCell.vue";
import Grid from "@/components/Grid.vue";
import { useElementBounding } from "@vueuse/core";
import { useMouseInElement } from "@vueuse/core";

const gridItems = ref([
  {
    id: 1,
    x: 1,
    y: 1,
    width: 1,
    height: 1,
    bgColor: "bg-green200",
    name: "section 1",
  },
  {
    id: 2,
    x: 2,
    y: 1,
    width: 2,
    height: 1,
    bgColor: "bg-orange200",
    name: "section 2",
  },
  {
    id: 3,
    x: 1,
    y: 2,
    width: 1,
    height: 1,
    bgColor: "bg-yellow200",
    name: "section 3",
  },
  {
    id: 4,
    x: 2,
    y: 2,
    width: 1,
    height: 1,
    bgColor: "bg-red200",
    name: "section 4",
  },
  {
    id: 5,
  },
]);
const isDraggable = ref(true);
const draggedItemId = ref(0);
const gridItemWidth = ref("");
const gridItemHeight = ref("");
const gridPositionProperty = ref("");
const gridItemPositionProperty = ref("");
const xPosition = ref(null as any);
const yPosition = ref(null as any);
const target = ref(null);

function drag(event: any, item: any) {
  draggedItemId.value = item.id;
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer?.setData("text", event.target.id);
    const { width, height } = useElementBounding(event.target);
    gridItemWidth.value = `${width.value}px`;
    gridItemHeight.value = `${height.value}px`;
    gridPositionProperty.value = "relative";
    gridItemPositionProperty.value = "fixed";
    xPosition.value = `${elementX.value}px`;
    yPosition.value = `${elementY.value}px`;
  }
}

const { elementX, elementY } = useMouseInElement(target);

function allowDrop(event: any) {
  event.preventDefault();
  xPosition.value = `${elementX.value}px`;
  yPosition.value = `${elementY.value}px`;
}

function drop(event: any) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text", event.target.id);
  event.target.appendChild(document.getElementById(data));
}
</script>
<template>
  <Grid
    ref="target"
    id="grid"
    :columns="{ 600: 2, 900: 3, 1200: 4, 1600: 5 }"
    :rows="{ 480: 2, 800: 3, 1024: 4, 1200: 5 }"
    @dragover="allowDrop($event)"
    @drop="drop($event)"
    :class="gridPositionProperty"
  >
    <GridCell
      :draggable="isDraggable"
      id="gridItem"
      v-for="(item, index) in gridItems"
      :key="index"
      :initialColPositionX="item.x"
      :widthInCols="item.width"
      :initialRowPositionY="item.y"
      :heightInRows="item.height"
      @dragstart="drag($event, item)"
      :style="{
        width: `${gridItemWidth}`,
        height: `${gridItemHeight}`,
        top: `${yPosition}`,
        left: `${xPosition}`,
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
