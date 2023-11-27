<script lang="ts" setup>
import GridCell from "@/components/GridCell.vue";
import Grid from "@/components/Grid.vue";
</script>
<template>
  <Grid
    :columns="{ 600: 2, 900: 3, 1200: 4, 1600: 5 }"
    :rows="{ 480: 2, 800: 3, 1024: 4, 1200: 5 }"
  >
    <GridCell
      :initialColPositionX="1"
      :widthInCols="2"
      :initialRowPositionY="2"
      :heightInRows="1"
    >
      <div class="w-full h-full p-3 rounded-lg bg-green200">section 1</div>
    </GridCell>
    <GridCell
      :initialColPositionX="3"
      :widthInCols="3"
      :initialRowPositionY="1"
      :heightInRows="2"
    >
      <div class="w-full h-full p-3 rounded-lg bg-orange200">section 2</div>
    </GridCell>
    <GridCell
      :initialColPositionX="1"
      :widthInCols="5"
      :initialRowPositionY="3"
      :heightInRows="1"
    >
      <div class="w-full h-full p-3 rounded-lg bg-yellow200">section 3</div>
    </GridCell>
    <GridCell
      :initialColPositionX="1"
      :widthInCols="2"
      :initialRowPositionY="1"
      :heightInRows="1"
    >
      <div class="w-full h-full p-3 rounded-lg bg-red200">section 4</div>
    </GridCell>
  </Grid>
</template>
