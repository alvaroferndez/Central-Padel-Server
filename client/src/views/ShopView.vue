<script setup>
import {authentificationStore} from "../stores/authentification";
import { adminShopStore } from "../stores/Admin/adminShop";
import Shop from "../components/ShopComponent.vue";
import { ref } from "vue";

// stores
const shopStore = adminShopStore();
const auth = authentificationStore();

// variables
var products = ref([]);

// functions
function getAllProducts() {
    shopStore.getAllProducts().then((response) => {
        products.value = response.data;
    });
}

getAllProducts();
</script>


<template>
    <div class="global-container">
      <!-- <Shop v-for="product of products" :product="product"/> -->
      <router-link :to="{ path: '/shop/category', query: 'men'}">Hombre</router-link>
      <router-link :to="{ path: '/shop/category', query: 'women'}">Mujer</router-link>
      <router-link :to="{ path: '/shop/category', query: 'blade'}">Palas</router-link>
    </div>
</template>


<style lang="scss">
@import "@/assets/styles.scss";

</style>