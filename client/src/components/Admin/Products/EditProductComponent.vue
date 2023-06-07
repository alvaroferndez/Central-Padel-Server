<script setup>
import { adminStore } from "../../../stores/Admin/admin";
import { adminShopStore } from "../../../stores/Admin/adminShop";
import { ref } from "vue";
import { toastStore } from "../../../stores/toast";


// stores
const admin = adminStore();
const adminShop = adminShopStore();
const toast = toastStore();

// variables
var new_image = ref('');
var image = ref('');
var product = admin.actual_component.props;
var size = ref('');
var stock = ref('');
var show_add_size = ref(false);
var show_remove_size = ref(false);

// functions
function setImage(e) {
    new_image.value = e.target.files[0]
    product.image = new_image.value;
}

async function getImage(path){
    var server_image = await adminShop.getImage(path);
    image.value = server_image;
}

function showNewSize() {
    show_add_size.value = true;
    size.value = '';
    stock.value = '';
}

function showRemoveSize() {
    show_remove_size.value = true;
    size.value = '';
}


function addNewSize() {
    if(size.value == 'xs' || size.value == 's' || size.value == 'm' || size.value == 'l' || size.value == 'xl' || size.value == '2xl') {
        if(stock.value > 0) {
            for (let i = 0; i < product.sizes.length; i++) {
                if (product.sizes[i].size === size.value) {
                    product.sizes[i].stock = stock.value;
                }
            }
            show_add_size.value = false;
            size.value = '';
            stock.value = '';
            toast.showSuccess('Talla añadida');
        }else{
            toast.showError('Cantidad no valida');
        }
    }else{
        toast.showError('Talla no valida');
    }
}

function removeSize() {
    for (let i = 0; i < product.sizes.length; i++) {
        if (product.sizes[i].size === size.value) {
            product.sizes[i].stock = -1;
        }
    }
    show_add_size.value = false;
    size.value = '';
    stock.value = '';
    toast.showSuccess('Talla eliminada');
}



getImage(product.path);
</script>


<template>
<div class="global-container">
    <button class="go-back" @click="admin.actual_component.subcomponent = 'home'">
      <v-icon name="bi-arrow-return-left" class="icon" scale="2"/>
    </button>
    <div class="container">
        <div>
            <h1>Editar producto</h1>
        </div>
        <img :src="image" alt="">
        <input type="file" @change="setImage($event)" name="image" id="image">
        <input type="text" v-model="product.name" placeholder="Nombre del producto">
        <input type="text" v-model="product.price" placeholder="Precio del producto">
        <input type="text" v-model="product.description" placeholder="Descripcion del producto">
        <input type="text" v-model="product.category" placeholder="Categoria del producto">
        <button type="button" @click="showNewSize()">Añadir talla nueva</button>
        <button type="button" @click="showRemoveSize()">Eliminar talla</button>
        <div v-if="show_add_size">
            <input type="text" v-model="size" placeholder="Talla">
            <input type="text" v-model="stock" placeholder="Cantidad">
            <button type="button" @click="addNewSize()">Añadir</button>
        </div>
        <div v-if="show_remove_size">
            <input type="text" v-model="size" placeholder="Talla">
            <button type="button" @click="removeSize()">Eliminar</button>
        </div>
        <div>
            <h2>Tallas</h2>
            <div v-for="size in product.sizes">
                <span v-if="size.stock != -1">{{ size.size }}</span>
                <input v-model="size.stock" v-if="size.stock != -1"/>
            </div>
        </div>
        <button type="button" @click="adminShop.editProduct(product)">Guardar producto</button>
    </div>
</div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.global-container{

  .go-back{
    @include goBackButton();
  }
}
</style>