import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAdminProductsStore = defineStore('adminProducts', () => {
  const products = ref([])

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://my-backend-flse.onrender.com/api/products')
      products.value = res.data
    } catch (err) {
      console.error('Ошибка загрузки товаров:', err)
    }
  }

  const saveProducts = async () => {
    try {
      await axios.post('https://my-backend-flse.onrender.com/api/products', products.value)
      alert('✅ Товары успешно сохранены')
    } catch (err) {
      console.error('Ошибка при сохранении товаров:', err)
      alert('❌ Ошибка при сохранении')
    }
  }

  const deleteProduct = (id) => {
    products.value = products.value.filter(p => p.id !== id)
  }

  const addProduct = (product) => {
    products.value.push(product)
  }

  const updateProduct = (updatedProduct) => {
    const index = products.value.findIndex(p => p.id === updatedProduct.id)
    if (index !== -1) products.value[index] = updatedProduct
  }

  return { products, fetchProducts, saveProducts, deleteProduct, addProduct, updateProduct }
})
