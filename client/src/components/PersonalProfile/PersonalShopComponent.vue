<script setup>
import { adminShopStore } from '../../stores/Admin/adminShop';
import { ref } from 'vue';
import SingleProduct from '../SingleProductComponent.vue';

// store
const adminShop = adminShopStore();

// variables

// functions
adminShop.getUserProducts()
</script>


<template>
  <div class="global-container">
    <SingleProduct v-for="product of adminShop.products" :product="product"/>
  </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.global-container{
  border: 1px solid black;

}
</style>