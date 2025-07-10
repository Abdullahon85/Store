import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const productsStore = defineStore('products', () => {
  let products = ref([])
  const getProducts = async () => {
    try {
      let response = await axios.get(`https://my-backend-flse.onrender.com/api/products`)
      products.value = response.data
      // console.log(products.value);
    } catch (error) {
      console.error('Ошибка при получении данных ' + error)
    }
  }

  return { products, getProducts, }
})
