<script lang="ts" setup>
import GridCell from "@/components/GridCell.vue";
import Grid from "@/components/Grid.vue";
</script>

<template>
  <Grid>
    <GridCell width="1/3" height="1/3">
      <div class="w-full h-full p-3 rounded-lg bg-white">section 1</div>
    </GridCell>
    <GridCell width="3/6" height="1/3">
      <div class="w-full h-full p-3 rounded-lg bg-white">section 2</div>
    </GridCell>
    <GridCell width="1/6" height="3/3">
      <div class="w-full h-full p-3 rounded-lg bg-white">section 3</div>
    </GridCell>
  </Grid>
</template>
