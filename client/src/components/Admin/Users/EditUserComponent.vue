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

function editUser(){
    adminUser.editUser();
}

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
                    <label for="">Nombre</label>
                    <input type="text" v-model="adminUser.actual_user.name" placeholder="sin definir">
                </div>
                <div>
                    <label for="">Nombre de usuario</label>
                    <input type="text" v-model="adminUser.actual_user.user_name" placeholder="sin definir">
                </div>
                <div>
                    <label for="">Teléfono</label>
                    <input type="text" v-model="adminUser.actual_user.phone" placeholder="sin definir">
                </div>
                <div>
                    <label for="">Edad</label>
                    <input type="text" v-model="adminUser.actual_user.age" placeholder="sin definir">
                </div>
                <div>
                    <label for="">Posición</label>
                    <input type="text" v-model="adminUser.actual_user.position" placeholder="sin definir">
                </div>
                <div>
                    <label for="">Categoría</label>
                    <input type="text" v-model="adminUser.actual_user.category" placeholder="sin definir">
                </div>
                <div>
                    <label for="">Años jugados</label>
                    <input type="text" v-model="adminUser.actual_user.years_played" placeholder="sin definir">
                </div>
                <div>
                    <label for="">Experiencia</label>
                    <input type="text" v-model="adminUser.actual_user.experience" placeholder="sin definir">
                </div>
                <div>
                    <label for="">Club</label>
                    <input type="text" v-model="adminUser.actual_user.club" placeholder="sin definir">
                </div>
                <button class="button" v-on:click="editUser()">Guardar cambios</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '@/assets/styles.scss';

@include adminProduct();
</style>
