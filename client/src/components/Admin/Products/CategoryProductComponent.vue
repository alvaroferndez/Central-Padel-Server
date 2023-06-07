<script setup>
import { adminStore } from "../../../stores/Admin/admin";
import { adminShopStore } from "../../../stores/Admin/adminShop";
import { ref, defineProps } from "vue";
import SingleProductComponent from "./SingleProductComponent.vue";


// stores
const admin = adminStore();
const adminShop = adminShopStore();

// variables
var props = defineProps(['category'])
var products = ref([]);

// functions
async function getProductsOfCategory(){
    products.value = await adminShop.getProductsOfCategory(props.category);
    if(products.value.length > 0) {
        for(let element of products.value) {
            element.sizes = await adminShop.getProductSize(element);
        }
    }
}

getProductsOfCategory();
</script>


<template>
    <div class="global-container">
      <button class="go-back" @click="adminShop.category_component = 'any'">
        <v-icon name="bi-arrow-return-left" class="icon" scale="2"/>
      </button>
      <div class="container-products">
        <SingleProductComponent class="card" v-for="product of products" :product="product" :key="product.name"/>
        <div v-if="products.length == 0">No hay productos disponibles</div>
      </div>
    </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.global-container{
  // display
  @include flexbox(column, center, center, 1.5rem);

  // margin
  margin-top: 5%;
  margin-bottom: 5%;

  .go-back{
    @include goBackButton();
  }

  .container-products{
    // size
    width: 75%;
    min-height: 70vh;

    // display
    @include autoGrid();

    @media screen and (max-width: 698px) {
      width: 90%;
    }

    @media screen and (max-width: 582px) {
      width: 50%;
    }

    @media screen and (max-width: 495px) {
      width: 60%;
    }

    @media screen and (max-width: 420px) {
      width: 70%;
    }
  }
}
</style>