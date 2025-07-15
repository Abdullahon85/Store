import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5173/'

export const useAdminProductsStore = defineStore('adminProducts', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    loading.value = true
    try {
      const res = await axios.get('/api/products')
      products.value = res.data
    } catch (err) {
      console.error('Ошибка загрузки товаров:', err)
      error.value = err.response?.data?.detail || 'Ошибка при загрузке'
    } finally {
      loading.value = false
    }
  }

  const saveProduct = async (product) => {
    try {
      const res = await axios.post('/api/products', product)
      products.value.push(res.data)
    } catch (err) {
      console.error('Ошибка при сохранении:', err)
      error.value = err.response?.data?.detail || 'Ошибка при сохранении'
    }
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`)
      products.value = products.value.filter(p => p.id !== id)
    } catch (err) {
      console.error('Ошибка при удалении:', err)
      error.value = err.response?.data?.detail || 'Ошибка при удалении'
    }
  }

  const addProduct = (product) => {
    products.value.push(product)
  }

  const updateProduct = (updatedProduct) => {
    const index = products.value.findIndex(p => p.id === updatedProduct.id)
    if (index !== -1) products.value[index] = updatedProduct
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    saveProduct,
    deleteProduct,
    addProduct,
    updateProduct
  }
})
