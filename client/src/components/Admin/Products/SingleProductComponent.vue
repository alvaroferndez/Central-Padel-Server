<script setup>
import {adminStore} from "../../../stores/Admin/admin";
import {adminShopStore} from "../../../stores/Admin/adminShop";
import { defineProps, ref } from "vue";

// stores
const admin = adminStore();
const adminShop = adminShopStore();

// variables
var props = defineProps(['product'])
var image = ref('');

async function getImage(path){
    var server_image = await adminShop.getImage(path);
    image.value = server_image;
}

function changeToEdit(){
    admin.changeSubcomponent("edit");
    admin.changeProps(props.product);
}

function changeToView(product){
    admin.changeSubcomponent("view");
    admin.changeProps(product);
}

getImage(props.product.path);
</script>

<template>
    <div @click="changeToView(product)">
        {{ props.product.name }}   
        <img :src="image" :alt="props.product.name">
    </div>
    <v-icon name="md-modeeditoutline-outlined" scale="2" @click="changeToEdit()"></v-icon>
</template>


<style scoped>

</style>