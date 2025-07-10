<template>
  <nav class="nav">
    <div class="container">
      <div class="nav__box">
        <ul class="nav__box-list">
          <router-link
            v-for="link in links"
            :key="link.name"
            :to="link.url"
            class="nav__box-list-link"
            >{{ link.name }}</router-link
          >
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount,  } from "vue";
import cartIcon from '/public/images/icons8-shopping-cart-48.png'
import { cartStore } from '@/stores/cartStore'

const cart = cartStore()

const links = ref([{ url: "/", name: "Товары"
  }, { url: "/cart", name: "Корзина", img: cartIcon
 }]);



// const handleClickOutside = (e) => {
//   if (wrapper.value && !wrapper.value.contains(e.target)) {
//     isOpen.value = false;
//   }
// };

// onMounted(() => document.addEventListener("click", handleClickOutside));
// onBeforeUnmount(() =>
//   document.removeEventListener("click", handleClickOutside)

// );
//автоматическое закрытие  корзины при клике вне нее
</script>