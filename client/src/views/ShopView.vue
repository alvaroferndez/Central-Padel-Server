<script setup>
import {authentificationStore} from "../stores/authentification";
import { adminShopStore } from "../stores/Admin/adminShop";
import { ref } from "vue";

// stores
const shopStore = adminShopStore();
const auth = authentificationStore();

// variables
var products = ref([]);

// functions
function getAllProducts() {
    shopStore.getAllProducts().then((response) => {
        products.value = response.data;
    });
}

getAllProducts();
</script>


<template>
    <div class="global-container">
        <div class="container">
            <div class="container-category">
                <router-link class="category hover" v-for="category of shopStore.categories" :to="{ path: '/shop/category', query: category.value}" :key="category.value">
                    <div class="container-title">
                        <h2 class="title">{{category.title}}</h2>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.global-container{
    // size
    width: 100%;
    height: 80vh;

    // display
    @include flexbox(column);
    .container{
        .container-category{
            // size
            width: 80%;
            height: 60%;

            // display
            @include flexbox(row,center,center,5rem);
            .category{
                //size
                width: 100%;
                height: 100%;

                // decortaion
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;

                &:nth-child(1){
                    background-image: url('https://www.siuxpadel.com/wp-content/uploads/2023/03/20230217-Diablo-Sanyo-Pro-34-683x1024.jpg');
                }
                &:nth-child(2){
                    background-image: url('https://www.siuxpadel.com/wp-content/uploads/2022/12/20221130-Trilogy-Control-Patty-53-1024x683.jpg');
                }
                &:nth-child(3){
                    background-image: url('https://img.freepik.com/foto-gratis/arreglo-raquetas-pelotas-tenis_23-2149434236.jpg');
                }

                &:hover{
                    cursor: pointer;
                }
            }

            .container-title{
                // size
                width: 100%;
                height: 100%;

                // display
                @include flexbox();
                .title{
                // decoration
                color: $h-c-white;
                text-align: center;
                font-size: 2rem;
                font-weight: bold;
                text-shadow: 7px 8px 12px rgba(210,3,0,0.53);
                text-transform: uppercase;
                }
            }
        }
    }
}
</style>