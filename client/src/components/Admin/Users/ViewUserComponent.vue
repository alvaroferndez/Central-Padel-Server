<script setup>
import {adminUserStore} from "../../../stores/Admin/adminUser";
import {adminStore} from "../../../stores/Admin/admin";
import {authentificationStore} from "../../../stores/authentification";

// stores
const adminUser = adminUserStore();
const admin = adminStore();
const authentification = authentificationStore();


// functions
adminUser.getUserByEmail(admin.actual_component.props);

function goHome(){
    admin.changeProps('');
    admin.changeSubcomponent('home');
}

</script>


<template>
    <div class="global-container">
        <button class="go-back" v-on:click="goHome()">
          <v-icon name="bi-arrow-return-left" class="icon" scale="2"/>
        </button>
        <div class="container">
            <div class="container-image">
                <img :src="adminUser.actual_user.photo ? adminUser.actual_user.photo : '../../../src/assets/images/profile-photo.webp'" alt="foto de perfil">
            </div>
            <div class="container-data">
                <div>
                    <label for="">Nombre: </label>
                    <span>{{ adminUser.actual_user.name }}</span>
                </div>
                <div>
                    <label for="">Nombre de usuario: </label>
                    <span>{{ adminUser.actual_user.user_name }}</span>
                </div>
                <div>
                    <label for="">Email: </label>
                    <span>{{ adminUser.actual_user.email }}</span>
                </div>
                <div>
                    <label for="">Teléfono: </label>
                    <span>{{ adminUser.actual_user.phone }}</span>
                </div>
                <div>
                    <label for="">Edad: </label>
                    <span>{{ adminUser.actual_user.age }}</span>
                </div>
                <div>
                    <label for="">Posición: </label>
                    <span>{{ adminUser.actual_user.position }}</span>
                </div>
                <div>
                    <label for="">Categoría: </label>
                    <span>{{ adminUser.actual_user.category }}</span>
                </div>
                <div>
                    <label for="">Años jugados: </label>
                    <span>{{ adminUser.actual_user.years_played }}</span>
                </div>
                <div>
                    <label for="">Experiencia: </label>
                    <span>{{ adminUser.actual_user.experience }}</span>
                </div>
                <div>
                    <label for="">Club: </label>
                    <span>{{ adminUser.actual_user.club }}</span>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '@/assets/styles.scss';

@include adminProduct();
</style>
