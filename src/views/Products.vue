<template>
    <div class="products">
        <div class="container">
            <div class="top"></div>
            <h2 class="products__sort-title">Товары</h2>

            
            <div class="products__sort">
                <div class="products__sort-box">
                    <span>Сортировка</span>
                    <select v-model="sortType" class="products__sort-box-select">
                        <option class="option" value="Название">Название</option>
                        <option class="option" value="Цена">Цена</option>
                        <option class="option" value="Кол-во">Кол-во</option>
                    </select>
                </div>
                <div class="products__sort-searchBox" style="display: flex">
                    <span>Поиск</span>
                    <input 
                    type="text" 
                    class="products__sort-searchBox-search"
                    placeholder="Поиск"
                    v-model="search"
                    >
                </div>
            </div>
            <div class="products__box" v-if="products">
 <Card
  v-for="(product, index) in sortedProducts" :key="index" :product="product" 
/>

            </div>
            <Loader v-else/>
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



onMounted(() => {
  store.getProducts()
})


// Доступ к товарам (по умолчанию пусть будет [] вместо null)
const products = computed(() => store.products || [])

// Поиск
const search = ref('')
const applyFilter = ref(false)
const filteredProducts = computed(() => {
  if (!search.value) return products.value
  return products.value.filter(p =>
    p.title?.toLowerCase().includes(search.value.toLowerCase())
  )
})

// Реакция на поиск
watch(search, _debounce((newVal) => {
  applyFilter.value = newVal !== ''
  if (applyFilter.value) {
    filteredProducts.value = products.value.filter(p =>
      p.title?.toLowerCase().includes(newVal.toLowerCase())
    )
  } else {
    filteredProducts.value = []
  }
  currentPage.value = 1
}, 300))

// Пагинация
const productsPerPage = ref(5)
const currentPage = ref(1)

const totalPages = computed(() => {
  const list = applyFilter.value ? filteredProducts.value : products.value
  return Math.ceil(list.length / productsPerPage.value)
})

// Сортировка + пагинация
const sortType = ref('Название')

const sortedProducts = computed(() => {
  const list = applyFilter.value ? filteredProducts.value : products.value
  const sorted = [...list]

  if (sortType.value === 'Название') {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortType.value === 'Цена') {
    sorted.sort((a, b) => a.price - b.price)
  } else if (sortType.value === 'Кол-во') {
    sorted.sort((a, b) => a.stock - b.stock)
  }

  const start = (currentPage.value - 1) * productsPerPage.value
  const end = start + productsPerPage.value

  return sorted.slice(start, end)
})

// Переключение страниц
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const goToPage = (page) => {
  currentPage.value = page
}



</script>
