<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.title" placeholder="Название" required />
    <input v-model.number="form.price" type="number" min="1" placeholder="Цена" required />
    <input v-model="form.image" placeholder="Ссылка на изображение" required />
    <input v-model.number="form.discountPercentage" type="number" min="0" max="100" placeholder="Скидка %" required />
    <button type="submit">{{ form.id ? 'Обновить' : 'Добавить' }}</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'save'])

const defaultForm = () => ({
  id: null,
  title: '',
  price: 0,
  image: '',
  discountPercentage: 0
})

const form = ref(defaultForm())

watch(() => props.modelValue, (val) => {
  form.value = val ? { ...val } : defaultForm()
}, { immediate: true })

const onSubmit = () => {
  const { title, price, image, discountPercentage } = form.value
  if (!title.trim() || !image.trim() || price <= 0 || discountPercentage < 0 || discountPercentage > 100) {
    alert('❌ Пожалуйста, заполните все поля корректно')
    return
  }

  emit('save', { ...form.value })
  form.value = defaultForm()
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 1rem;
}
input {
  padding: 0.5rem;
}
button {
  padding: 0.5rem;
  cursor: pointer;
}
</style>
