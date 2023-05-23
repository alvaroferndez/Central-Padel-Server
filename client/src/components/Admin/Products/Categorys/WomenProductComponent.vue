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
var product = {};

// functions
function setImage(e) {
    image.value = e.target.files[0]
    image.value.new_name = `${uuidv4()}.${image.value.name.split('.').pop()}`;
    product.image = image.value
}
</script>


<template>
    <div>
        <h1>WomenProductComponent</h1>
    </div>
    <input type="file" @change="setImage($event)" name="image" id="image">
    <button type="button" @click="adminShop.addProduct(product)">Guardar producto</button>
</template>


<style scoped>
</style>