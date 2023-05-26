<script setup>
import { defineProps } from 'vue';
import { adminShopStore } from '../stores/Admin/adminShop';
import { ref } from 'vue';
import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalProductComponent from './modals/ModalProductComponent.vue'

// props
const props = defineProps(['product']);

// stores
var adminShop = adminShopStore();


// variables
var image = ref('');
var product = ref(props.product);
adminShop.actual_product = product.value;
var { open, close } = useModal({
    attrs: {
        onConfirm() {
            close()
        },
    },
    slots: {
        default: ModalProductComponent,
    }
})


// functions
async function getImage(path){
    var server_image = await adminShop.getImage(path);
    image.value = server_image;
    adminShop.actual_image = image.value;
}

function setData(){
    adminShop.actual_product = product.value;
    adminShop.actual_image = image.value;
}

getImage(product.value.path);

</script>


<template>
    <ModalsContainer/>
    <div></div>
    <div class="card" @click="() => {open(); setData()}">
        <div class="card-image">
            <img :src="image" :alt="product.name" class="image"/>
        </div>
        <div class="card-content">
            <p class="card-title">{{ product.name }}</p>
            <p class="card-price">{{ product.price }} &euro;</p>
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
}

</style>