<script setup>
import { adminShopStore } from '../../stores/Admin/adminShop';
import { authentificationStore } from '../../stores/authentification';
import { ref } from 'vue';


// stores
var adminShop = adminShopStore();
var auth = authentificationStore();
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

function canBook(){
    return adminShop.canBook(product.value);
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
                        <div class="price">
                            <h2>{{ product.price }} &euro;</h2>
                        </div>
                        <div v-if="product.sizes && product.category != 'blade'" class="container-sizes">
                            <h2 class="title">Tallas</h2>
                            <div class="container-size">
                                <div class="size" v-for="size in product.sizes">
                                    <label class="disable-size" disabled v-if="size.stock == 0">{{ size.size }}</label>
                                    <div class="radio-size" v-if="size.stock > 0">
                                        <input type="radio" v-model="book_size" :id="size.size" name="sizes" :value="size.size">
                                        <label :for="size.size">{{ size.size }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="button" v-if="canBook() && auth.user.email">
                            <button @click="bookProduct()">Reservar</button>
                        </div>
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
                    // size
                    max-width: 100%;
                    max-height: 100%;

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
                    width: 80%;
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
                        height: 30%;

                        // decoration
                        overflow-y:auto;
                    }

                    .price{
                        // size
                        height: 20%;

                        // display
                        @include flexbox(row,center,flex-start);

                        h2{
                            // decoration
                            font-size: $h-f-size-extra;
                            font-weight: 500;
                        }

                    }

                    .container-sizes {
                        // size
                        height: 15%;

                        // display
                        @include flexbox(column,flex-start,flex-start);

                        .title {
                            // decoration
                            font-size: 18px;
                            font-weight: 400;
                        }

                        .container-size{
                            // display
                            @include flexbox(row,center,flex-start, .7rem);

                            .size {
                            .disable-size {
                                // margin
                                padding: 5px 10px;

                                // decoration
                                opacity: 0.5;
                                border: none;
                                cursor: not-allowed;
                                text-transform: uppercase;
                            }

                            .radio-size {
                                // display
                                display: block;

                                // margin
                                margin: 16px 0;

                                input {
                                    //display
                                    display: none;

                                    & + label {
                                        // size
                                        height: 22px;

                                        // display
                                        display: block;

                                        // position
                                        position: relative;

                                        // margin
                                        padding-left: 10px;

                                        // decoration
                                        line-height: 22px;
                                        cursor: pointer;
                                        text-transform: uppercase;


                                        &:not(:empty) {
                                            // margin
                                            padding-left: 25px;
                                        }

                                        &:before, &:after {
                                            // size
                                            width: 22px;
                                            height: 22px;

                                            // display
                                            display: block;

                                            // position
                                            left: 0;
                                            top: 0;
                                            position: absolute;

                                            // decoration
                                            content: '';
                                            border-radius: 50%;
                                            
                                        }
                                        &:before {
                                            // decoration
                                            background: $h-c-gray;

                                            // transition
                                            transition: background .2s ease, transform .4s cubic-bezier(.175, .885, .32, 2);
                                        }
                                        &:after {
                                            // decoration
                                            background: $h-c-white;
                                            transform: scale(.78);

                                            // transition
                                            transition: transform .6s cubic-bezier(.175, .885, .32, 1.4);
                                        }
                                    }
                                    &:checked + label {
                                        &:before {
                                            // decoration
                                            transform: scale(1.04);
                                            background: #1a88ff;
                                        }

                                        &:after {
                                            // decoration
                                            transform: scale(.4);

                                            // transition
                                            transition: transform .3s ease;
                                        }
                                    }
                                }
                                &:hover {
                                    input {
                                        & + label {
                                            &:before {
                                                // decoration
                                                transform: scale(.92);
                                            }
                                            &:after {
                                                // decoration
                                                transform: scale(.74);
                                            }
                                        }
                                        &:checked + label {
                                            &:after {
                                                // decoration
                                                transform: scale(.4);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        }
                    }

                    .button{
                        // size
                        width: 100%;
                        height: 15%;

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
            }

            @media screen and (max-width: 1100px){
                // size
                height: 100%;

                @include flexbox(column,center,center);
                
                .container-image{
                    height: 50%;
                    width: 80%;
                }

                .content{
                    height: 70%;
                    width: 100%;

                    .data{
                        .name{
                            // decoration
                            font-size: 1rem;
                        }

                        .description{
                            // size
                            height: 20%;

                            // decoration
                            font-size: 0.8rem;
                        }

                        .price{

                            h2{
                                // decoration
                                font-size: 1rem;
                            }
                        }

                        .container-sizes{
                            // size
                            height: 30%;

                            .title{
                                // decoration
                                font-size: 0.8rem;
                            }

                            .container-size{
                                .size{
                                    .radio-size{
                                        input{
                                            & + label{
                                                &:before{
                                                    width: 15px;
                                                    height: 15px;
                                                }
                                                &:after{
                                                    width: 15px;
                                                    height: 15px;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        .button{
                            button{
                                padding: 5px 10px;
                                font-size: 0.8rem;
                            }
                        }
                    }
                }
            }
        }
    }
}


</style>