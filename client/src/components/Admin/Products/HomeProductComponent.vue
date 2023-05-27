<script setup>
import {adminStore} from "../../../stores/Admin/admin";
import {adminMatchStore} from "../../../stores/Admin/adminMatch";
import {adminShopStore} from "../../../stores/Admin/adminShop";
import { ref } from "vue";
import CategoryProductComponent from "./CategoryProductComponent.vue";

// stores
const admin = adminStore();
const adminMatch = adminMatchStore();
const adminShop = adminShopStore();

// variables
var products = ref([]);

// functions

function addProduct(day, hour, court) {
  var match = {
    date: day.date,
    hour: hour.hour_start,
    court: court,
  }

  adminShop.addProduct();
}

function viewMatch(e, day, hour, court, id){
  e.stopPropagation()
  if(e.target.innerHTML == "+") {
    addPreparerMatch(day, hour, court)
  }else{
    admin.changeProps(id);
    admin.changeSubcomponent("view");
  }
}

function editMatch(e, id){
  e.stopPropagation()
  admin.changeProps(id);
  admin.changeSubcomponent("edit");
}

function deleteMatch(e, id){
  e.stopPropagation()
  adminMatch.deleteMatch(id, days[0], days[6]);
}



</script>


<template>
    <div class="global-container">
        <button type="button" @click="admin.changeSubcomponent('add')">Añadir producto</button>
        <div class="container">
            <div class="container-category" v-if="adminShop.category_component == 'any'">
                <div class="category hover" v-for="category of adminShop.categories" @click="adminShop.changeCategoryComponent(category.value)" :key="category.value">
                    <h2>{{category.title}}</h2>
                    <div class="container-image" v-if="category.value == 'blade'">
                        <img  src="@/assets/images/paddel-raquet.png" :alt="category.title">
                    </div>
                </div>
            </div>
            <CategoryProductComponent v-if="adminShop.category_component == 'men'" category="men"/>
            <CategoryProductComponent v-if="adminShop.category_component == 'blade'" category="blade"/>
            <CategoryProductComponent v-if="adminShop.category_component == 'women'" category="women"/>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '@/assets/styles.scss';

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