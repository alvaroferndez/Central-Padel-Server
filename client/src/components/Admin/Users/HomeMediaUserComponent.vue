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
            <div class="card" v-for="user of authentification.users" :key="user.email" v-on:click="viewUser(user.email)">
                <div class="container-image">
                    <img :src="user.photo ? user.photo : '@/assets/images/profile-photo-6be0f302.webp'" class="photo-profile" alt="Foto de perfil"/>
                </div>
                <div class="container-data">
                    <div>
                        <span v-if="user.name">{{ user.name }}</span>
                        <span v-else class="undefined">sin definir</span>
                    </div>
                    <div>
                        <span v-if="user.email">{{ user.email }}</span>
                        <span v-else class="undefined">sin definir</span>
                    </div>
                    <div>
                        <span v-if="user.user_name">{{ user.user_name }}</span>
                        <span v-else class="undefined">sin definir</span>
                    </div>
                    <div class="actions">
                        <v-icon class="edit-button" v-on:click="editUser($event, user.email)" name="md-modeeditoutline-outlined" scale="2"></v-icon>
                        <v-icon class="delete-button" v-if="user.email != authentification.user.email" @click="deleteUser($event, user.email)" name="bi-trash-fill" scale="2"></v-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '@/assets/styles.scss';


.global-container{
    // display
    @include flexbox();

    .container{
        // size
        width: 70%;

        // display
        @include autoGrid();
        
        .card{
            // size
            width: 100%;
            height: 350px;

            // display
            @include flexbox(column, center, space-between);

            // margin
            margin: 10px;

            // decoration
            border-radius: 10px;
            box-shadow: 0px 10px 34px 12px rgba(0,0,0,0.1);
            background-color: $h-c-white;
            overflow: hidden;
            cursor: pointer;

            // transition
            transition: all 0.3s ease-in-out;

            &:hover{
                // decoration
                transform: scale(1.05);
            }

            .container-image{
                // size
                width: 100%;
                height: 50%;

                // display
                @include flexbox();

                img{
                    // size
                    width: 100%;
                    height: 100%;

                    // decoration
                    object-fit: cover;
                }
            }

            .container-data{
                // size
                width: 50%;
                height: 50%;

                // display
                @include flexbox(column, center, space-evenly);

                div{
                    // size
                    width: 100%;

                    // display
                    @include flexbox(row, center, space-between);

                    // margin
                    margin: 0 10px;

                    span{
                        // size
                        width: 100%;

                        // display
                        @include flexbox(row, center, flex-start);
                    }

                    .undefined{
                        // decoration
                        color: $h-c-white-shade;
                        font-style: italic;
                    }
                }

                .edit-button{
                    // decoration
                    color: $h-c-blue;
                }

                .delete-button{
                    color: $h-c-red-ligth;
                }
            }
        }
    }
}


</style>

