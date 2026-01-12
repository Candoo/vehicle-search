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
  <nav v-if="vehicleStore.totalPages > 1" class="container" aria-label="Pagination navigation">
    <button
      class="btn btn--nav"
      :disabled="vehicleStore.currentPage === 1"
      aria-label="Go to previous page"
      @click="vehicleStore.previousPage()"
    >
      <svg 
        width="10" 
        height="12" 
        viewBox="0 0 10 12" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M7 11L2.7071 6.70706C2.31658 6.31653 2.31659 5.68337 2.70711 5.29284L7 1" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>

    </button>

    <div class="pages" role="group" aria-label="Page numbers">
      <button
        v-for="page in visiblePages"
        :key="page"
        class="btn btn--page"
        :class="{ 'btn--active': page === vehicleStore.currentPage }"
        :aria-current="page === vehicleStore.currentPage ? 'page' : undefined"
        :aria-label="`Go to page ${page}`"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="btn btn--nav"
      :disabled="vehicleStore.currentPage === vehicleStore.totalPages"
      aria-label="Go to next page"
      @click="vehicleStore.nextPage()"
    >
      <svg 
        width="10" 
        height="12" 
        viewBox="0 0 10 12" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M3 1L7.2929 5.29294C7.68342 5.68347 7.68342 6.31663 7.29289 6.70716L3 11" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <button
      class="btn btn--nav"
      :disabled="vehicleStore.currentPage === vehicleStore.totalPages"
      aria-label="Go to last page"
      @click="goToLast"
    >
      <svg 
        width="20" 
        height="12" 
        viewBox="0 0 20 12" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M13 1L17.2929 5.29294C17.6834 5.68347 17.6834 6.31663 17.2929 6.70716L13 11" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
        <path 
          d="M3 1L7.2929 5.29294C7.68342 5.68347 7.68342 6.31663 7.29289 6.70716L3 11" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </nav>
</template>

<style lang="scss" scoped src="~/assets/styles/components/_pagination.scss"></style>
