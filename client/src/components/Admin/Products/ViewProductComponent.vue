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
          <span>{{ product.price }}</span>
          <span>{{ product.description }}</span>
          <span>{{ product.category }}</span>

          <h2>Tallas</h2>
          <div class="container-sizes">
            <div class="size" v-for="size in product.sizes">
              <p v-if="size.stock != -1">{{size.size}}: {{size.stock}}</p>
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
    border: 1px solid black;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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

    .container-header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 10px;

      .go-back {
        @include goBackButton();
      }
    }

    .container-data {
      border: 1px solid black;
      width: 100%;
      display: flex;
      padding: 20px;

      @include flexbox(column);

      .container-image{
        border: 1px solid black;
        height: 50%;

        @include flexbox();

        img {
          width: 200px;
          height: auto;
          border-radius: 8px;
        }
      }

      .data {
        border: 1px solid black;
        height: 50%;
        margin-left: 20px;

        @include flexbox(column);

        h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        span {
          display: block;
          font-size: 16px;
          margin-bottom: 5px;
        }

        h2 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        .container-sizes{
          @include flexbox(row, center, flex-start);

          .size{
            p {
              border: 1px solid black;
              border-radius: 8px;
              padding: 5px;
              margin-right: 5px;
              font-size: 16px;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
}
</style>