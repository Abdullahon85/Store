<template>
  <div class="products">
    <div class="container">
      <div class="top"></div>
      <h2 class="products__sort-title">Товары</h2>

      <!-- Сортировка и Поиск -->
      <div class="products__sort">
        <div class="products__sort-searchBox" style="display: flex">
          <span>Поиск</span>
          <input
            type="text"
            class="products__sort-searchBox-search"
            placeholder="Поиск"
            v-model="search"
          />
        </div>
      </div>

      <!-- Товары -->
      <div class="products__box" v-if="sortedProducts.length">
        <Card
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
      <Loader v-else />

      <!-- Пагинация -->
      <div class="products__pagination " >
                <button class="products__pagination-btn" @click="prevPage()" :disabled="currentPage === 1">Назад</button>
                <ul class="products__pagination-list cort">
                    <li 
                    v-for="page in totalPages" 
                    :key="page" 
                    @click="goToPage(page)"
                    class="products__pagination-list-link"
                    :class="{ active: currentPage == page }"
                    >
                    {{ page }}
                    </li>
                </ul>
                <button class="products__pagination-btn" @click="nextPage()" :disabled="currentPage === totalPages">Вперед</button>
            </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import _debounce from 'lodash/debounce'
import Card from '@/components/Cards.vue'
import { productsStore } from '@/stores/productsStore.js'

const store = productsStore()
onMounted(() => store.getProducts())

const search = ref('')
const sortType = ref('Название')
const currentPage = ref(1)
const productsPerPage = 4

const filteredProducts = computed(() => {
  const term = search.value.toLowerCase()
  return store.products.filter(p =>
    p.title?.toLowerCase().includes(term)
  )
})

const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]
  if (sortType.value === 'Название') {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortType.value === 'Цена') {
    sorted.sort((a, b) => a.price - b.price)
  }
  return sorted
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage
  return sortedProducts.value.slice(start, start + productsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / productsPerPage)
})

const goToPage = (page) => currentPage.value = page
const prevPage = () => currentPage.value > 1 && currentPage.value--
const nextPage = () => currentPage.value < totalPages.value && currentPage.value++

watch(search, _debounce(() => {
  currentPage.value = 1
}, 300))
</script>

<style scoped>
/* Добавьте стили по необходимости */
</style>
