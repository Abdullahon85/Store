<template>
  <div class="admin">
    <h1>Админ-панель</h1>

    <ProductForm :modelValue="editedProduct" @save="handleSave" />
    <ProductList :products="products" @edit="startEdit" @delete="deleteProduct" />

    <button @click="saveProducts">💾 Сохранить изменения</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductList from '../components/ProductList.vue'
import ProductForm from '../components/ProductForm.vue'
import { useAdminProductsStore } from '../store/adminProductsStore'

const store = useAdminProductsStore()
const products = store.products

const editedProduct = ref(null)

onMounted(() => {
  store.fetchProducts()
})

const handleSave = (product) => {
  if (product.id) {
    store.updateProduct(product)
  } else {
    product.id = Date.now()
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

const saveProducts = () => {
  store.saveProducts()
}
</script>

<style scoped>
.admin {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}
</style>
