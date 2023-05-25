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
}

getProductsOfCategory();
</script>


<template>
    <div class="global-container">
        <button type="button" @click="adminShop.category_component = 'any'">Atrás</button>
        <div>
            <SingleProductComponent class="card" v-for="product of products" :product="product" :key="product.name"/>
        </div>
    </div>
</template>


<style scoped>
</style>