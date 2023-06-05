<script setup>
import { adminShopStore } from '../../stores/Admin/adminShop';
import { ref } from 'vue';
import SingleProduct from '../SingleProductComponent.vue';

// store
const adminShop = adminShopStore();

// variables

// functions
adminShop.products = [];
adminShop.getUserProducts()
</script>


<template>
  <div class="global-container">
    <div v-for="product of adminShop.products" class="card" @click="() => { open(); setData() }">
      <div class="card-image">
        <img :src="product.image" :alt="product.name" class="image" />
      </div>
      <div class="card-content">
        <p class="card-title">{{ product.name }}</p>
        <p class="card-price">{{ product.price }} &euro;</p>
        <p class="card-size">{{ product.size }}</p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.global-container {
  // display
  @include flexbox();
  flex-wrap: wrap;

  // margin
  margin-top: 1rem;
  margin-bottom: 5rem;
  .card {
    // size
    width: 300px;
    height: 300px;

    // margin
    padding: 10px;
    margin-top: 2rem;
    margin-right: .5rem;
    margin-left: .5rem;

    // decoration
    border-radius: 10px;
    box-shadow: inset 0px 10px 52px -52px rgba(0, 0, 0, 0.1);

    //transition
    transition: transform .7s;

    &:hover {
      // decoration
      box-shadow: 0px 10px 80px 35px rgba(0, 0, 0, 0.1);
      transform: scale(1.03);

      .card-image {
        // decoration
        transform: scale(1.08);

        img {
          // decoration
          opacity: 1;
          transform: scale(1.2);
        }
      }
    }

    .card-image {
      // size
      width: 80%;
      height: 80%;

      // dsiplay
      @include flexbox();

      // margin
      margin: auto;

      // decoration
      box-shadow: 0px 10px 55px -18px rgba(0, 0, 0, 0.1);
      border-radius: 500px;
      background: $h-c-white;

      // transition
      transition: transform .7s;

      img {
        //size
        height: 80%;
        width: 80%;

        // decoration
        border-radius: 500px;
        opacity: 0.9;
        object-fit: cover;

        // transition
        transition: 0.5s;

      }
    }

    .card-content {
      // size 
      width: 100%;
      height: 20%;

      // margin
      margin-top: 10px;

      // decoration
      text-align: center;

      .card-title {
        // decoration
        font-size: $h-f-size-text-small;
        text-transform: uppercase;
      }

      .card-price {
        // decoration
        font-size: $h-f-size-text-small;
        font-weight: bold;
      }

      .card-size {
        // decoration
        font-weight: bold;
        text-transform: uppercase;
      }

      .card-price, .card-size, .card-title {
        // size
        height: calc(100% / 3);
      }
    }
  }
}
</style>