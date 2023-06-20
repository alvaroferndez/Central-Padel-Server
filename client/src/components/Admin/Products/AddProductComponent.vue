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
var product = ref({
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
});
var size = ref('');
var stock = ref('');
var show_add_size = ref(false);
var show_remove_size = ref(false);

// functions
function setImage(e) {
    image.value = e.target.files[0]
    product.value.image = image.value;
}

function showNewSize() {
    show_add_size.value = !show_add_size.value;
    size.value = '';
    stock.value = '';
}

function showRemoveSize() {
    show_remove_size.value = !show_remove_size.value;
    size.value = '';
}


function addNewSize() {
    if(size.value == 'xs' || size.value == 's' || size.value == 'm' || size.value == 'l' || size.value == 'xl' || size.value == '2xl') {
        if(stock.value > 0) {
            for (let i = 0; i < product.value.sizes.length; i++) {
                if (product.value.sizes[i].size === size.value) {
                    product.value.sizes[i].stock = stock.value;
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
    for (let i = 0; i < product.value.sizes.length; i++) {
        if (product.value.sizes[i].size === size.value) {
            product.value.sizes[i].stock = -1;
        }
    }
    show_add_size.value = false;
    size.value = '';
    stock.value = '';
    toast.showSuccess('Talla eliminada');
}

function addProduct() {
    if(product.value.name == '' || product.value.price == '' || product.value.description == '' || product.value.category == '' || product.value.image == '') {
        toast.showError('Rellena todos los campos');
        return;
    }
    adminShop.addProduct(product.value);
    admin.actual_component.subcomponent = 'home';
}
</script>


<template>
<div class="global-container">
    <button class="go-back" @click="admin.actual_component.subcomponent = 'home'">
      <v-icon name="bi-arrow-return-left" class="icon" scale="2"/>
    </button>
    <div class="container">
        <div>
            <h1>Añadir producto</h1>
        </div>
        <div class="container-data">
          <div>
            <label for="image">Imagen</label>
            <input type="file" @change="setImage($event)" name="image" id="image">
          </div>
          <div>
            <label for="name">Nombre</label>
            <input type="text" v-model="product.name" name="name" placeholder="Nombre del producto">
          </div>
          <div>
            <label for="price">Precio</label>
            <input type="text" v-model="product.price" name="price" placeholder="Precio del producto">
          </div>
          <div>
            <label for="description">Descripción</label>
            <input type="text" v-model="product.description" name="description" placeholder="Descripcion del producto">
          </div>
          <div>
            <label for="category">Category</label>
            <input type="text" v-model="product.category" placeholder="Categoria del producto">
          </div>
          <button v-if="product.category != 'palas'" class="button" type="button" @click="showNewSize()">Añadir talla nueva</button>
          <div v-if="show_add_size && product.category != 'palas'">
              <input type="text" v-model="size" placeholder="Talla">
              <input type="text" v-model="stock" placeholder="Cantidad">
              <button class="button" type="button" @click="addNewSize()">Añadir</button>
          </div>
          <button v-if="product.category != 'palas'" class="button" type="button" @click="showRemoveSize()">Eliminar talla</button>
          <div v-if="show_remove_size && product.category != 'palas'">
              <input type="text" v-model="size" placeholder="Talla">
              <button class="button" type="button" @click="removeSize()">Eliminar</button>
          </div>
          <div v-if="product.category != 'palas'" class="container-sizes">
              <h2>Tallas</h2>
              <div v-for="size in product.sizes">
                  <p v-if="size.stock != -1">{{size.size.toUpperCase()}}: {{size.stock}}</p>
              </div>
          </div>
          
          <button class="button" type="button" @click="addProduct(product)">Guardar producto</button>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

@include adminProduct(); 
</style>