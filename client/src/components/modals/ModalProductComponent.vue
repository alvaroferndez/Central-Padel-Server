<script setup>
import { adminShopStore } from '../../stores/Admin/adminShop';
import { ref } from 'vue';


// stores
var adminShop = adminShopStore();
var emit = defineEmits(['closeModal']);

// variables
var image = ref(adminShop.actual_image);
var product = ref(adminShop.actual_product);
var book_size = ref('');

// functions
function confirm(){
    emit('closeModal');
}

function bookProduct(){
    adminShop.bookProduct(product.value, book_size.value);
}
</script>


<template>
    <div class="global-container">
        <div class="container">
            <section class="card">
                <div class="container-image">
                    <img :src="image" alt="">
                </div>
                <div class="content">
                    <div class="data">
                        <h1 class="name">{{ product.name }}</h1>
                        <p class="description">{{ product.description }}</p>
                        <h2 class="price">{{ product.price }} &euro;</h2>
                        <div class="sizes">
                            <h2>Tallas</h2>
                            <div v-for="size in product.sizes">
                                <button disabled v-if="size.stock == 0">{{ size.size }}</button>
                                <div v-if="size.stock > 0">
                                    <input type="radio" v-model="book_size" :id="size.size" name="sizes" :value="size.size">
                                    <label :for="size.size">{{ size.size }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="button">
                            <button @click="bookProduct()">Reservar</button>
                        </div>
                    </div>
                    <div class="close" @click="confirm()">
                        <v-icon name="io-close" class="icon" scale="2"/>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";
@import "https://unpkg.com/open-props";

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
                    // decoration
                    color: $h-c-white;
                }
                .data{
                    // size
                    width: 79%;
                    height: 80%;

                    // display
                    @include flexbox(column,flex-start,flex-start);

                    .name{
                        //size
                        height: 20%;

                        // decoration
                        text-transform: capitalize;
                    }

                    .description{
                        // size
                        height: 40%;
                    }

                    .price{
                        // size
                        height: 20%;

                        // decoration
                        font-size: $h-f-size-extra;
                        font-weight: 500;
                    }

                    .button{
                        // size
                        width: 100%;
                        height: 20%;

                        // display
                        @include flexbox(row,flex-start);

                        button{

                            // position
                            position: relative;

                            // margin
                            padding: var(--size-4) var(--size-8);

                            // decoration
                            font-family: var(--font-sans);
                            font-weight: 500;
                            font-size: $h-f-size-subtitle;
                            color: var(--gray-8);
                            background: var(--gray-0);
                            border: 0;
                            border-radius: 10px;
                            transform: translateY(calc(var(--y, 0) * 1%)) scale(var(--scale));

                            // transition
                            transition: transform 0.1s;

                            &:hover{
                                // position
                                --y: -10;
                                --scale: 1.1;
                                --border-scale: 1;
                            }

                            &:active{
                                // position
                                --y: 5%;
                                --scale: 0.9;
                                --border-scale: 0.9, 0.8;
                            }

                            &:before{
                                // position
                                position: absolute;
                                z-index: 100000000;

                                //  decoration
                                content: "";
                                inset: calc(var(--size-3) * -1);
                                border: var(--size-2) solid var(--gray-0);
                                transform: scale(var(--border-scale, 0));
                                border-radius: 20px;
                                --angle-one: 105deg;
                                --angle-two: 290deg;
                                --spread-one: 30deg;
                                --spread-two: 40deg;
                                --start-one: calc(var(--angle-one) - (var(--spread-one) * 0.5));
                                --start-two: calc(var(--angle-two) - (var(--spread-two) * 0.5));
                                --end-one: calc(var(--angle-one) + (var(--spread-one) * 0.5));
                                --end-two: calc(var(--angle-two) + (var(--spread-two) * 0.5));
                                mask: conic-gradient(
                                    transparent 0 var(--start-one),
                                    white var(--start-one) var(--end-one),
                                    transparent var(--end-one) var(--start-two),
                                    white var(--start-two) var(--end-two),
                                    transparent var(--end-two)
                                );

                                // transition
                                transition: transform 0.125s;
                            }
                        }

                    }
                }

                .close{
                    // size
                    width: 1%;
                    height: 80%;
                }
            }

        }
    }
}


</style>