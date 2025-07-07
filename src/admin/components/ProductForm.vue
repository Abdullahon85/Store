<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.title" placeholder="Название" required />
    <input v-model.number="form.price" type="number" placeholder="Цена" required />
    <input v-model="form.image" placeholder="Ссылка на изображение" required />
    <input v-model.number="form.discountPercentage" type="number" placeholder="Скидка %" required />
    <button type="submit">{{ form.id ? 'Обновить' : 'Добавить' }}</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'save'])

const form = ref({ id: null, title: '', price: 0, image: '', discountPercentage: 0 })

watch(() => props.modelValue, (val) => {
  form.value = { ...val }
}, { immediate: true })

const onSubmit = () => {
  if (!form.value.title || !form.value.image) return
  emit('save', { ...form.value })
  form.value = { id: null, title: '', price: 0, image: '', discountPercentage: 0 }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 1rem;
}
</style>
