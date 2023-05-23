<script setup>
import { adminStore } from "../../../stores/Admin/admin";
import { adminShopStore } from "../../../stores/Admin/adminShop";
import { ref } from "vue";


// stores
const admin = adminStore();
const adminShop = adminShopStore();

// variables
var new_image = ref('');
var image = ref('');
var product = admin.actual_component.props;

// functions
function setImage(e) {
    new_image.value = e.target.files[0]
    product.image = new_image.value;
}

async function getImage(path){
    var server_image = await adminShop.getImage(path);
    image.value = server_image;
}

getImage(product.path);
</script>


<template>
<div class="global-container">
    <div class="container">
        <div>
            <h1>Editar producto</h1>
            <button type="butto" @click="admin.actual_component.subcomponent = 'home'">Atrás</button>
        </div>
        <img :src="image" alt="">
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