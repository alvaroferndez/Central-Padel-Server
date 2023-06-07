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
</script>


<template>
<div class="global-container">
    <div class="container">
      <div class="container-header">
            <button class="go-back" @click="admin.actual_component.subcomponent = 'home'">
              <v-icon name="bi-arrow-return-left" class="icon" scale="2"/>
            </button>
        </div>
      <div class="container-data">
        <div class="container-image">
          <img :src="image" :alt="product.path">
        </div>
        <div class="data">
          <h1>{{ product.name }}</h1>
          <span>{{ product.price }} &euro;</span>
          <span>{{ product.description }}</span>

          <h2>Tallas</h2>
          <div class="container-sizes">
            <div class="size" v-for="size in product.sizes">
              <span v-if="size.stock != -1">{{size.size.toUpperCase()}}: </span>
              <span v-if="size.stock != -1">{{size.stock}}</span>
            </div>
          </div>
        </div>
      </div>
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


    .container-header {
      // display
      @include flexbox(row, center, flex-start);

      // margin
      padding: 10px;

      .go-back {
        @include goBackButton();
      }
    }

    .container-data {
      // size
      width: 100%;

      // display
      @include flexbox();

      // margin
      padding: 20px;

      @include flexbox(column);

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

      .data {
        // size
        height: 50%;

        // display
        @include flexbox(column);

        // margin
        margin-left: 20px;


        h1 {
          // margin
          margin-bottom: 10px;

          // decoration
          font-size: 24px;
        }

        span {
          // display
          display: block;

          // margin
          margin-bottom: 5px;

          // decoration
          font-size: 16px;
        }

        h2 {
          // margin
          margin-bottom: 10px;
          
          // decoration
          font-size: 20px;
        }

        .container-sizes{
          // display
          @include flexbox(row, center, flex-start);

          .size{
            // display
            @include flexbox(row, center, flex-start);

            // margin
            padding: 10px;
            
            span{
              &:nth-child(1){
                // decoration
                font-weight: bold;
              }

              &:nth-child(2){
                // margin
                margin-left: 7.5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>