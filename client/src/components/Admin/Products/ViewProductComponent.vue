<script setup>
import { adminStore } from "../../../stores/Admin/admin";
import { adminShopStore } from "../../../stores/Admin/adminShop";
import { ref } from "vue";


// stores
const admin = adminStore();
const adminShop = adminShopStore();

// variables
var image = ref('');
var product = admin.actual_component.props;

// functions

async function getImage(path){
    var server_image = await adminShop.getImage(path);
    image.value = server_image;
}

getImage(product.path);
console.log(product);
</script>


<template>
<div class="global-container">
    <div class="container">
        <div>
            <h1>{{ product.name }}</h1>
            <button type="butto" @click="admin.actual_component.subcomponent = 'home'">Atrás</button>
        </div>
        <img :src="image" :alt="product.path">
        <span>{{ product.name }}</span>
        <span>{{ product.price }}</span>
        <span>{{ product.description }}</span>
        <span>{{ product.category }}</span>
        <div>
            <h2>Tallas</h2>
            <div v-for="size in product.sizes">
                <p v-if="size.stock != -1">{{size.size}}: {{size.stock}}</p>
            </div>
        </div>
    </div>
</div>
</template>


<style scoped>

</style>