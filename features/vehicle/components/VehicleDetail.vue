<script setup lang="ts">
import type { Vehicle } from '../types'

defineProps<{
  vehicle: Vehicle
}>()
</script>

<template>
  <article class="vehicle-detail">
    <h2>Vehicle Details</h2>
    <pre role="region" aria-label="Vehicle data">{{ vehicle }}</pre>
  </article>
</template>

<style lang="scss" scoped>
.vehicle-detail {

  h2 {
    margin-bottom: 1rem;
  }

  pre {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.5;
  }
}
</style>
