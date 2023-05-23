<script setup>
import {adminStore} from "../../../../stores/Admin/admin";
import { adminShopStore } from "../../../../stores/Admin/adminShop";
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';


// stores
const admin = adminStore();
const adminShop = adminShopStore();

// variables
var image = ref('');
var product = {
  name: '',
  price: '',
  description: '',
  image: '',
  category: '',
};

// functions
function setImage(e) {
    image.value = e.target.files[0]
    product.image = image.value;
}

function addProduct() {
    adminShop.addProduct(product);
}
</script>


<template>
    <div>
        <h1>WomenProductComponent</h1>
    </div>
    <input type="file" @change="setImage($event)" name="image" id="image">
    <input type="text" v-model="product.name" placeholder="Nombre del producto">
    <input type="text" v-model="product.price" placeholder="Precio del producto">
    <input type="text" v-model="product.description" placeholder="Descripcion del producto">
    <input type="text" v-model="product.category" placeholder="Categoria del producto">
    <button type="button" @click="adminShop.addProduct(product)">Guardar producto</button>
</template>


<style scoped>
</style>