<script lang="ts" setup>
import GridCell from "@/components/GridCell.vue";
import Grid from "@/components/Grid.vue";
</script>

<template>
  <Grid>
    <GridCell width="1/3" height="1/3" :position="{ x: '100px', y: '0' }">
      <div class="w-full h-full p-3 rounded-lg bg-green200">section 1</div>
    </GridCell>
    <GridCell width="3/6" height="1/3" :position="{ x: '0px', y: '200px' }">
      <div class="w-full h-full p-3 rounded-lg bg-orange200">section 2</div>
    </GridCell>
    <GridCell width="1/6" height="3/3" :position="{ x: '0', y: '-200px' }">
      <div class="w-full h-full p-3 rounded-lg bg-yellow200">section 3</div>
    </GridCell>
  </Grid>
</template>
