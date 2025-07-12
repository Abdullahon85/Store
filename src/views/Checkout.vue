<template>
  <div class="checkout container" v-if="cart.cartItems.length > 0">
    <h2>Оформление заказа</h2>
    <form @submit.prevent="submitOrder" class="checkout__form">
      <input v-model="form.name" placeholder="Имя" required />
      <input v-model="form.phone" placeholder="Телефон" required />
      <textarea v-model="form.address" placeholder="Адрес доставки" required></textarea>
      <button type="submit" :disabled="loading">Подтвердить заказ</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { cartStore } from '@/stores/cartStore'

const cart = cartStore()
const loading = ref(false)

const form = reactive({
  name: '',
  phone: '',
  address: ''
})

const submitOrder = async () => {
  if (cart.cartItems.length === 0) return alert("Корзина пуста!")
  loading.value = true

  try {
    const order = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      cart: cart.cartItems
    }

    const res = await fetch('https://my-backend-db1c.onrender.com/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })

    if (!res.ok) throw new Error()

    alert('✅ Заказ отправлен!')
    cart.cartItems = []
    form.name = ''
    form.phone = ''
    form.address = ''
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
