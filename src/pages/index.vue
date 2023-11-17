<script lang="ts" setup>
import chart from "@/components/Echart.vue";
import draggable from "@/components/BaseDraggable.vue";
</script>
<template>
  <div class="grid grid-cols-3 grid-rows-3 gap-12 bg-blue h-full">
    <draggable
      storage-key="draggable-1"
      storage-type="session"
      :initialValue="{ x: 0, y: 0 }"
      class="h-48 w-48 bg-white"
    >
      <template #content>
        <chart></chart>
      </template>
    </draggable>
    <draggable
      storage-key="draggable-2"
      storage-type="session"
      :initialValue="{ x: 0, y: 0 }"
      class="h-48 w-48 bg-white"
    >
      <template #content> teste </template>
    </draggable>
  </div>
</template>
