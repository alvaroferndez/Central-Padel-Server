<script setup>
import {adminUserStore} from "../../../stores/Admin/adminUser";
import {adminStore} from "../../../stores/Admin/admin";
import {authentificationStore} from "../../../stores/authentification";

// stores
const adminUser = adminUserStore();
const admin = adminStore();
const authentification = authentificationStore();

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
    <div class="global-container">
        <div class="container">
            <table>
                <thead>
                    <tr>
                    <th>Foto de perfil</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
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
                        <td><img :src="user.photo ? user.photo : '../../../src/assets/images/profile-photo.webp'" class="photo-profile" alt="Foto de perfil"></td>
                        <td class="overflow">{{ user.name ? user.name : 'sin definir' }}</td>
                        <td>{{ user.surname }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.dni }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.age }}</td>
                        <td>{{ user.position }}</td>
                        <td>{{ user.category }}</td>
                        <td>{{ user.years_played }}</td>
                        <td class="overflow">{{ user.experience }}</td>
                        <td>{{ user.club }}</td>
                        <td>
                            <div class="actions">
                                <button class="edit-button" v-on:click="editUser($event, user.email)">Editar</button>
                                <button class="delete-button" v-if="user.email != authentification.user.email" @click="deleteUser($event, user.email)">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<style lang="scss">
@import '@/assets/styles.scss';

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
                    background-color: $h-c-blue;
                    color: $h-c-white;
                }

                .delete-button{
                    background-color: $h-c-red-ligth;
                    color: $h-c-white;
                }
            }

            img{
                max-width: 50px;
            }
        }
    }
}

</style>

