<script lang="ts" setup>
import GridCell from "@/components/GridCell.vue";
import Grid from "@/components/Grid.vue";
</script>
<template>
  <Grid>
    <GridCell
      :width="2"
      :height="1"
      :initialColPositionX="1"
      :initialRowPositionY="2"
    >
      <div class="w-full h-full p-3 rounded-lg bg-green200">section 1</div>
    </GridCell>

    <GridCell
      :width="3"
      :height="2"
      :initialColPositionX="3"
      :initialRowPositionY="1"
    >
      <div class="w-full h-full p-3 rounded-lg bg-orange200">section 2</div>
    </GridCell>
    <GridCell
      :width="5"
      :height="1"
      :initialColPositionX="1"
      :initialRowPositionY="3"
    >
      <div class="w-full h-full p-3 rounded-lg bg-yellow200">section 3</div>
    </GridCell>
    <GridCell
      :width="2"
      :height="1"
      :initialColPositionX="1"
      :initialRowPositionY="1"
    >
      <div class="w-full h-full p-3 rounded-lg bg-red200">section 4</div>
    </GridCell>
  </Grid>
</template>
