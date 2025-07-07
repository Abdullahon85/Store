<script setup>
import { cartStore } from '@/stores/cartStore'
const cart = cartStore()
</script>

<template>
  <div class="cart-page">
    <h1>Корзина</h1>

    <div v-if="cart.cartItems.length > 0">
      <div v-for="item in cart.cartItems" :key="item.id" class="cart__item">
        <img :src="item.image" alt="product" class="cart__item-img" />
        <div class="cart__item-info">
          <h3>{{ item.title }}</h3>
          <p>Цена: {{ Math.round(item.price - item.price * item.discountPercentage / 100) }} сум</p>
          <div class="cart__item-controls">
            <button @click="cart.removeFromCart(item.id)">-</button>
            <span>{{ item.amount }}</span>
            <button @click="cart.addToCart(item)">+</button>
          </div>
        </div>
      </div>

      <div class="cart__summary">
        <strong>Итоговая сумма: {{ cart.totalPrice }} сум</strong>
        <router-link to="/checkout" class="btn-checkout">Оформить заказ</router-link>
      </div>
    </div>

    <div v-else>
      <p>Корзина пуста</p>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  padding: 2rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.cart__item {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}
.cart__item-controls {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 8px;
}
.cart__item-controls button {
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.cart__item-controls button:hover {
  background-color: #ccc;
}

.cart__item-controls span {
  min-width: 20px;
  text-align: center;
  font-weight: bold;
}
.cart__item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}
.cart__item-info {
  flex: 1;
}

.cart__summary {
    display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.btn-checkout {
  margin-top: 1rem;
  display: inline-block;
  padding: 10px 20px;
  background: #28a745;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
}
</style>
