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
var image = ref('');
var product = {
  name: '',
  price: '',
  description: '',
  image: '',
  category: '',
  sizes: [
    {
      size: 'xs',
      stock: -1
    },
    {
      size: 's',
      stock: -1
    },
    {
      size: 'm',
      stock: -1
    },
    {
      size: 'l',
      stock: -1
    },
    {
      size: 'xl',
      stock: -1
    },
    {
      size: '2xl',
      stock: -1
    },
  ],
};
var size = ref('');
var stock = ref('');
var show_add_size = ref(false);
var show_remove_size = ref(false);

// functions
function setImage(e) {
    image.value = e.target.files[0]
    product.image = image.value;
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
                <p v-if="size.stock != -1">{{size.size}}: {{size.stock}}</p>
            </div>
        </div>

        <button type="button" @click="adminShop.addProduct(product)">Guardar producto</button>
    </div>
</div>
</template>


<style scoped>

</style>