<template>
  <div class="admin">
    <h1>Админ-панель</h1>

    <ProductForm :modelValue="editedProduct" @save="handleSave" />
    <ProductList :products="products" @edit="startEdit" @delete="deleteProduct" />

    <button @click="saveProducts">💾 Сохранить изменения</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ProductList from '../components/ProductList.vue'
import ProductForm from '../components/ProductForm.vue'
import { useAdminProductsStore } from '../store/adminProductsStore.js'

const store = useAdminProductsStore()
const products = computed(() => store.products)

const editedProduct = ref(null)

onMounted(() => {
  store.fetchProducts()
})

const handleSave = (product) => {
  if (product.id) {
    store.updateProduct(product)
  } else {
    let id = Date.now()
    while (products.value.find(p => p.id === id)) {
      id += Math.floor(Math.random() * 1000)
    }
    product.id = id
    store.addProduct(product)
  }
  editedProduct.value = null
}

const startEdit = (product) => {
  editedProduct.value = { ...product }
}

const deleteProduct = (id) => {
  if (confirm('Удалить товар?')) store.deleteProduct(id)
}

const saveProducts = async () => {
  await store.saveProducts()
  await store.fetchProducts()
}
</script>

<style scoped>
.admin {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}
</style>
