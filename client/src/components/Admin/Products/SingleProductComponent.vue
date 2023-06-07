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
    <div v-if="!grid_even"></div>
    <div class="card">
      <div class="card-image" @click="() => {changeToView(product)}">
        <img :src="image" :alt="props.product.name" class="image"/>
      </div>
      <div class="card-content" @click="() => {changeToView(product)}">
        <p class="card-title">{{ props.product.name }}</p>
        <p class="card-price">{{ props.product.price }} &euro;</p>
      </div>
      <div class="card-actions">
        <v-icon name="md-modeeditoutline-outlined" scale="2" @click="changeToEdit()"></v-icon>
        <v-icon name="md-deleteforever-round" scale="2" @click="adminShop.deleteProduct(props.product)"></v-icon>
      </div>
    </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.card {

  // margin
  padding: 10px;
    margin-bottom: 10px;

  // decoration
  border-radius: 10px;
    box-shadow: inset 0px 10px 52px -52px rgba(0,0,0,0.1);

  //transition
  transition: transform .7s;

  &:hover {
    // decoration
    box-shadow: 0px 10px 80px 35px rgba(0,0,0,0.1);
    cursor: pointer;
    transform: scale(1.03);

    .card-image{
    // decoration
    transform: scale(1.08);

      img{
      // decoration
      opacity:1;
        transform: scale(1.2);
      }
    }
  }

  .card-image {
    // size
    width: 80%;
    height: 200px;

    // dsiplay
    @include flexbox();

    // margin
    margin: auto;

    // decoration
    box-shadow: 0px 10px 55px -18px rgba(0,0,0,0.1);
    border-radius: 500px;
    background: $h-c-white;

    // transition
    transition: transform .7s;

      img{
        //size
        height: 80%;
          width: 80%;

        // decoration
        border-radius: 500px;
          opacity:0.9;
          object-fit: cover;

        // transition
        transition: 0.5s;

      }
    }

  .card-content {
    // margin
    margin-top: 10px;

    // decoration
    text-align: center;

    .card-title {
    // decoration
    font-size: $h-f-size-text-small;
      text-transform: uppercase;
    }

    .card-price {
      font-size: $h-f-size-text-small;
      font-weight: bold;
    }
  }

  .card-actions{
    // size
    width: 100%;

    // display
    @include flexbox();
    justify-content: space-around;

    // margin
    margin-top: 10px;
  }
}
</style>