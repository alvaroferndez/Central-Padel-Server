<script setup>
import { adminShopStore } from '../../stores/Admin/adminShop';
import { ref } from 'vue';

// stores
var adminShop = adminShopStore();


// variables
var image = ref(adminShop.actual_image);
var product = ref(adminShop.actual_product);

</script>


<template>
    <div class="global-container">
        <div class="container">
            <section class="card">
                <div class="container-image">
                    <img :src="image" alt="">
                </div>
                <div class="content">
                    <p class="p">{{ product.name }}</p>
                    <p>{{ product.price }} &euro;</p>
                </div>
            </section>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.global-container{
    // size
    width: 80vw;
    height: 80vh;

    // display
    @include flexbox();

    .container{
        // size
        width: 100%;
        height: 100%;

        // display
        @include flexbox();

        // decoration

        .card{
            // size
            width: 90%;
            height: 90%;

            // display
            @include flexbox();

            .container-image, .content{
                // display
                @include flexbox();

                // decoration
                border-radius: 10px;
            }

            .container-image{
                // size
                width: 50%;
                height: 80%;

                // decoration
                background-color: $h-c-white;

                img{
                    // display
                    justify-self: flex-start;

                    // decoration
                    border-radius: 10px;
                }
            }

            .content{
                // size
                width: 50%;
                height: 100%;

                // display
                @include flexbox();

                // decoration
                background-color: #1D212C;
                border-radius: 10px;
                & *{
                    color: $h-c-white;
                }
            }

        }
    }
}


</style>