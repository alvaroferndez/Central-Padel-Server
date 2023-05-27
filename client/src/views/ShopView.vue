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
                    <h2>{{category.title}}</h2>
                    <div class="container-image" v-if="category.value == 'blade'">
                        <img  src="@/assets/images/paddel-raquet.png" :alt="category.title">
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
                    .container-image{
                        @include flexbox();
                        width: 100%;
                        height: 90%;
                        img{
                            width: 100%;
                            height: 70%;
                        }
                    }
                }

                &:hover{
                    cursor: pointer;
                }
            }
        }
    }
}
</style>