<script setup>
import { adminStore } from "../../../stores/Admin/admin";
import { adminShopStore } from "../../../stores/Admin/adminShop";
import { ref } from "vue";


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
</script>


<template>
<div class="global-container">
    <div class="container">
        <div>
            <h1>Añadir producto</h1>
            <button type="butto" @click="admin.actual_component.subcomponent = 'home'">Atrás</button>
        </div>
        <input type="file" @change="setImage($event)" name="image" id="image">
        <input type="text" v-model="product.name" placeholder="Nombre del producto">
        <input type="text" v-model="product.price" placeholder="Precio del producto">
        <input type="text" v-model="product.description" placeholder="Descripcion del producto">
        <input type="text" v-model="product.category" placeholder="Categoria del producto">
        <button type="button" @click="adminShop.addProduct(product)">Guardar producto</button>
    </div>
</div>
</template>


<style scoped>

</style>