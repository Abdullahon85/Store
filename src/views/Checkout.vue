<template>
  <div style="margin-top: 100px; margin-bottom: 100px; display: flex; justify-content: center; align-items: center; flex-direction: column"><div class="checkout container" style="margin:auto;" v-if="productsStore">
    <h2 style="margin-bottom: 20px">Оформление заказа</h2>
    <form @submit.prevent="submitOrder" class="checkout__form">
      <input v-model="form.name" placeholder="Имя" required />
      <input v-model="form.phone" placeholder="Телефон для связи" required />
      <textarea v-model="form.address" placeholder="Адрес доставки" required></textarea>
      <button type="submit">Подтвердить заказ</button>
    </form>
  </div></div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { cartStore } from '@/stores/cartStore'
import { productsStore } from '@/stores/productsStore'

const cart = cartStore()

const form = reactive({
  name: '',
  phone: '',
  address: ''
})

const loading = ref(false)

const submitOrder = async () => {
  if (cart.cartItems.length === 0) return alert("Корзина пуста!")
  loading.value = true

  try {
    const order = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      cart: cart.cartItems
    }

    const response = await fetch('https://my-fastapi-backend-2.onrender.com/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })

    if (!response.ok) throw new Error()

    alert('✅ Заказ отправлен!')
    cart.cartItems = []
  } catch {
    alert('❌ Ошибка! Попробуйте позже.')
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
.checkout__form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}
.checkout__form input,
.checkout__form textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.checkout__form button {
  background: green;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
