<script setup lang="ts">
import { useVehicleStore } from '~/stores/vehicle'

const vehicleStore = useVehicleStore()

const maxVisiblePages = 3

const visiblePages = computed(() => {
  const total = vehicleStore.totalPages
  const current = vehicleStore.currentPage
  const pages: number[] = []

  if (total <= maxVisiblePages) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    let start = Math.max(1, current - Math.floor(maxVisiblePages / 2))
    let end = start + maxVisiblePages - 1

    if (end > total) {
      end = total
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= vehicleStore.totalPages) {
    vehicleStore.setPage(page)
  }
}

const goToFirst = () => goToPage(1)
const goToLast = () => goToPage(vehicleStore.totalPages)
</script>

<template>
  <nav v-if="vehicleStore.totalPages > 1" class="pagination" aria-label="Pagination navigation">
    <button
      class="pagination-btn pagination-btn--nav"
      :disabled="vehicleStore.currentPage === 1"
      aria-label="Go to first page"
      @click="goToFirst"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="11 17 6 12 11 7"></polyline>
        <polyline points="18 17 13 12 18 7"></polyline>
      </svg>
    </button>

    <button
      class="pagination-btn pagination-btn--nav"
      :disabled="vehicleStore.currentPage === 1"
      aria-label="Go to previous page"
      @click="vehicleStore.previousPage()"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <div class="pagination-pages" role="group" aria-label="Page numbers">
      <button
        v-for="page in visiblePages"
        :key="page"
        class="pagination-btn pagination-btn--page"
        :class="{ 'pagination-btn--active': page === vehicleStore.currentPage }"
        :aria-current="page === vehicleStore.currentPage ? 'page' : undefined"
        :aria-label="`Go to page ${page}`"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="pagination-btn pagination-btn--nav"
      :disabled="vehicleStore.currentPage === vehicleStore.totalPages"
      aria-label="Go to next page"
      @click="vehicleStore.nextPage()"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <button
      class="pagination-btn pagination-btn--nav"
      :disabled="vehicleStore.currentPage === vehicleStore.totalPages"
      aria-label="Go to last page"
      @click="goToLast"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="13 17 18 12 13 7"></polyline>
        <polyline points="6 17 11 12 6 7"></polyline>
      </svg>
    </button>
  </nav>
</template>

<style lang="scss" scoped src="~/assets/styles/components/_pagination.scss"></style>
