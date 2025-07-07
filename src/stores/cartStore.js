import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const cartStore = defineStore("cart", () => {
  const cartItems = ref([]);

  // ✅ Добавить товар в корзину (без ограничений по количеству)
  const addToCart = (product) => {
    const found = cartItems.value.find((item) => item.id === product.id);
    if (found) {
      found.amount++;
    } else {
      cartItems.value.push({
        ...product,
        amount: 1,
      });
    }
  };

  // ✅ Уменьшить количество или удалить товар
  const removeFromCart = (productId) => {
    const found = cartItems.value.find((item) => item.id === productId);
    if (found) {
      found.amount--;
      if (found.amount <= 0) {
        cartItems.value = cartItems.value.filter(
          (item) => item.id !== productId
        );
      }
    }
  };

  // ✅ Общая сумма всех товаров
  const totalPrice = computed(() =>
    cartItems.value.reduce(
      (sum, item) =>
        sum +
        item.amount *
          Math.round(item.price - item.price * (item.discountPercentage / 100)),
      0
    )
  );

  // ✅ Общее количество единиц товаров
  const totalCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.amount, 0)
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    totalPrice,
    totalCount,
  };
});
