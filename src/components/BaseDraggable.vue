<script lang="ts" setup>
import { UseDraggable } from "@vueuse/components";
</script>
<template>
  <UseDraggable
    storage-key="draggable-1"
    storage-type="session"
    :initialValue="{ x: 0, y: 0 }"
    class="h-72 w-96 bg-white"
    style="position: absolute"
  >
    <slot name="content"></slot>
  </UseDraggable>
</template>
