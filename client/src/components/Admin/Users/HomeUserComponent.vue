<script setup>
import {adminUserStore} from "../../../stores/Admin/adminUser";
import {adminStore} from "../../../stores/Admin/admin";
import {authentificationStore} from "../../../stores/authentification";
import HomeMediaUserComponent from "./HomeMediaUserComponent.vue";
import { ref } from "vue";

// stores
const adminUser = adminUserStore();
const admin = adminStore();
const authentification = authentificationStore();

// variables
var width = ref(window.innerWidth);

// functions
function editUser(e,email){
    e.stopPropagation();
    admin.changeProps(email);
    admin.changeSubcomponent('edit');
}

function deleteUser(e,email){
    e.stopPropagation();
    adminUser.deleteUser(email);
}

function viewUser(email){
    admin.changeProps(email);
    admin.changeSubcomponent('view');
}

authentification.getAllUsers();
</script>


<template>
    <div v-if="width >= 1350" class="global-container">
        <div class="container">
            <table>
                <thead>
                    <tr>
                    <th>Foto de perfil</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>DNI</th>
                    <th>Nombre de usuario</th>
                    <th>Años</th>
                    <th>Posición</th>
                    <th>Categoría</th>
                    <th>Años jugados</th>
                    <th>Experiencia</th>
                    <th>Club</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user of authentification.users" :key="user.email" v-on:click="viewUser(user.email)">
                        <!-- <td><img :src="user.photo ? user.photo : '../../../src/assets/images/profile-photo.webp'" class="photo-profile" alt="Foto de perfil"></td> -->
                        <td><img :src="user.photo ? user.photo : '../../../assets/profile-photo-6be0f302.webp'" class="photo-profile" alt="Foto de perfil"></td>
                        <td class="overflow">{{ user.name ? user.name : 'sin definir' }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.dni }}</td>
                        <td>{{ user.user_name }}</td>
                        <td>{{ user.age }}</td>
                        <td>{{ user.position }}</td>
                        <td>{{ user.category }}</td>
                        <td>{{ user.years_played }}</td>
                        <td class="overflow">{{ user.experience }}</td>
                        <td>{{ user.club }}</td>
                        <td>
                            <div class="actions">
                                <v-icon class="edit-button" v-on:click="editUser($event, user.email)" name="md-modeeditoutline-outlined" scale="2"></v-icon>
                                <v-icon class="delete-button" v-if="user.email != authentification.user.email" @click="deleteUser($event, user.email)" name="bi-trash-fill" scale="2"></v-icon>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <HomeMediaUserComponent v-else></HomeMediaUserComponent>
</template>


<style lang="scss">
@import '@/assets/styles.scss';


.global-container{

    .container{
    // size
    width: 100%;

    // display
    @include flexbox();

        table {
            // size
            width: 80%;

            // margin
            margin-bottom: 20px;

            // decoration
            border-collapse: collapse;

            tbody{
                tr{
                    // decoration
                    cursor: pointer;
                    
                    .overflow{
                        // decoration
                        overflow: hidden;
                    }
                }
            }
            
            th, td{
                // margin
                padding: 8px;

                // decoration
                border: 1px solid #ddd;
                text-align: left;
            }

            th{
                // decoration
                background-color: #f2f2f2;
                font-weight: bold;

                img{
                    // size
                    max-width: 50px;
                }
            }

            td {
                .actions{
                    // decoration
                    white-space: nowrap;
                    
                    button{
                        // margin
                        margin: 0 4px;
                        padding: 4px 8px;

                        // decoration
                        border-radius: 4px;
                        border: none;
                        cursor: pointer;
                    }

                    .edit-button{
                        // decoration
                        color: $h-c-blue;
                    }

                    .delete-button{
                        color: $h-c-red-ligth;
                    }
                }

                img{
                    max-width: 50px;
                }
            }
        }
    }
}


</style>

