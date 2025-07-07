<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.title }} — {{ product.price }} сум (скидка: {{ product.discountPercentage }}%)
      <button @click="$emit('edit', product)">✏️</button>
      <button @click="$emit('delete', product.id)">🗑️</button>
    </li>
  </ul>
</template>

<script setup>
defineProps(['products'])
defineEmits(['edit', 'delete'])
</script>

<style scoped>
li {
  margin: 6px 0;
}
button {
  margin-left: 10px;
}
</style>
