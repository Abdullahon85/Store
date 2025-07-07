<script setup>
import { computed } from 'vue'
import { cartStore } from '@/stores/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cart = cartStore()

// Кол-во товара в корзине
const amount = computed(() => {
  const found = cart.cartItems.find(p => p.id === props.product.id)
  return found ? found.amount : 0
})

// Цена со скидкой
const discountedPrice = computed(() => {
  const discount = props.product.price * (props.product.discountPercentage / 100)
  return props.product.price - Math.round(discount)
})

// Формат цены
const formatPrice = (value) =>
  new Intl.NumberFormat('ru-RU').format(value)
</script>

<template>
  <div class="products__box-item">
    <!-- Картинка и название -->
    <div class="products__box-item-imgBox">
      <img :src="product.image" class="products__box-item-img" />
      <h3 class="products__box-item-text-title">{{ product.title }}</h3>
    </div>

    <!-- Информация -->
    <div class="products__box-item-text">
      <p><strong>Бренд:</strong> {{ product.brand || 'Не указан' }}</p>
      <p><strong>В наличии:</strong> {{ product.stock || '—' }}</p>
      <p><strong>Цена:</strong> {{ formatPrice(product.price) }} сум</p>
      <p v-if="product.discountPercentage > 0">
        <strong>Со скидкой:</strong>
        <span style="text-decoration: line-through; color: #999;">
          {{ formatPrice(product.price) }}
        </span>
        →
        <span style="color: #e63946;">
          {{ formatPrice(discountedPrice) }} сум
        </span>
      </p>
      <p v-else><strong>Скидки отсутствуют</strong></p>
    </div>

    <!-- Кнопки корзины -->
    <div class="products__box-item-cart">
      <button @click="cart.removeFromCart(product.id)" :disabled="amount === 0">−</button>
      <span>{{ amount }}</span>
      <button @click="cart.addToCart(product)">+</button>
    </div>
  </div>
</template>

<style scoped>
.products__box-item-cart {
  margin-bottom: 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.products__box-item-cart button {
  background-color: #eee;
  border: none;
  padding: 5px 12px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.products__box-item-cart button:hover {
  background-color: #ccc;
}

.products__box-item-cart output {
  min-width: 25px;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
}
</style>
