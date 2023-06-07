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
    <button class="go-back" @click="admin.actual_component.subcomponent = 'home'">
      <v-icon name="bi-arrow-return-left" class="icon" scale="2"/>
    </button>
    <div class="container">
        <div>
            <h1>Añadir producto</h1>
        </div>
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
        <button type="button" @click="showNewSize()">Añadir talla nueva</button>
        <div v-if="show_add_size">
            <input type="text" v-model="size" placeholder="Talla">
            <input type="text" v-model="stock" placeholder="Cantidad">
            <button type="button" @click="addNewSize()">Añadir</button>
        </div>
        <button type="button" @click="showRemoveSize()">Eliminar talla</button>
        <div v-if="show_remove_size">
            <input type="text" v-model="size" placeholder="Talla">
            <button type="button" @click="removeSize()">Eliminar</button>
        </div>
        <div class="container-sizes">
            <h2>Tallas</h2>
            <div v-for="size in product.sizes">
                <p v-if="size.stock != -1">{{size.size.toUpperCase()}}: {{size.stock}}</p>
            </div>
        </div>

        <button type="button" @click="adminShop.addProduct(product)">Guardar producto</button>
    </div>
</div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.global-container {
  // display
  @include flexbox(column, center, center, 1.5rem);

  // margin
  margin-top: 5%;
  margin-bottom: 5%;

  .container {
    // display
    @include flexbox(column, center, center, 1.5rem);

    // size
    width: 75%;

    // margin
    margin-top: 5%;
    margin-bottom: 5%;

    // border
    border-radius: 5px;

    // padding
    padding: 1rem;

    // decoration
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .container-image{
        // size
        height: 50%;

        // display
        @include flexbox();

        img {
          // size
          width: 200px;
          height: auto;

          // decoration
          border-radius: 8px;
        }
    }

    .container-data {
      // size
      width: 40%;

      // display
      @include flexbox();

      // margin
      padding: 20px;

      @include flexbox(column, flex-start, flex-start, 1.5rem);

      div{
        // size
        width: 100%;

        // display
        @include flexbox(row, space-between, flex-start);

        
      }
      
      .container-sizes{
            // size
            width: 100%;

            // display
            @include flexbox(column, flex-start, flex-start, .5rem);

            h2{
                // size
                width: 100%;
            }

            div{
                // size
                width: 100%;

                // display
                @include flexbox(row, space-between, flex-start);

                input{
                    // size
                    width: 50px;
                }
            }
        }
    }
  }
}
</style>