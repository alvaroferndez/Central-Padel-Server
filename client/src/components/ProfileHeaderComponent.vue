<script setup>
import {authentificationStore} from "../stores/authentification";
import { adminShopStore } from "../stores/Admin/adminShop";
import { ref } from 'vue';

// store
const authentification = authentificationStore();
const adminShop = adminShopStore();

// variables
var image = ref("");

// functions
async function getImage(path){
    if (path == undefined || path == "") {
        return;
    }
    var server_image = await adminShop.getImage(path);
    image.value = server_image;
}

getImage(authentification.user.path);
</script>


<template>
  <section class="header-profile">
    <div class="container">
      <div class="container-photo">
        <img v-if="image != ''" :src="image" alt="foto de perfil">
        <!-- <img v-else src="../assets/images/profile-photo.webp" alt="foto de perfil"> -->
        <img v-else src="../assets/profile-photo-6be0f302.webp" alt="foto de perfil">
      </div>
      <div class="container-information">
        <div class="information">
          <div>
            <label class="label">Nombre: 
              <span v-if="authentification.user.name">{{ authentification.user.name }}</span>
              <span class="undefined" v-else>sin definir</span>
            </label>
          </div>
          <div>
            <label class="label">Correo: 
              <span v-if="authentification.user.email">{{ authentification.user.email }}</span>
              <span class="undefined" v-else>sin definir</span>
            </label>
          </div>
          <div>
            <label class="label">Nombre de usuario: 
              <span v-if="authentification.user.user_name">{{ authentification.user.user_name }}</span>
              <span class="undefined" v-else>sin definir</span>
            </label>
          </div>
        </div>
        <!-- <div class="friend">
          <button type="button">Añadir a amigos</button>
        </div> -->
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.header-profile{
  // display
  @include flexbox(row, center);

  .container{
    // size
    width: 65%;
    height: 80%;

    // display
    @include flexbox(row, center, center);

    &-photo{
      // size
      width: 30%;
      height: 100%;

      // display
      @include flexbox();

      // decoration
      border-radius: 30%;
      overflow: hidden;

      img{
        // size
        width: 100%;
        height: 100%;

        // decoration
        object-fit: cover;
      }
    }

    &-information{
      // size
      width: 70%;
      height: 100%;

      // display
      @include flexbox(row, center, space-around);

      // margin
      padding-top: 2.5%;
      padding-bottom: 2.5%;
      margin-left: 1rem;

      .information{
        // size
        height: 100%;

        // display
        @include flexbox(column, flex-start, space-around);

        .label{
          font-weight: bold;

          .undefined{
            // decoration
            color: $h-c-white-shade;
            font-style: italic;
          }
        }
      }

      .friend{
        button{
          @include button();
        }
      }
    }

    @media screen and (max-width: 1250px) {
        & {
          width: 80%;
        }
    }

    @media screen and (max-width: 950px) {
        & {
          width: 90%;
        }
    }

    @media screen and (max-width: 825px) {
      & {
        width: 99%;
      }
    }

    @media screen and (max-width: 750px) {
      & {
        flex-direction: column;

        .container-photo{
          // size
          height: 50%;
        }

        .container-information{
          // size
          width: 100%;
          height: 50%;
        }
      }
    }

    @media screen and (max-width: 550px) {
      & {
        .container-information{
          align-items: center;
          justify-content: space-evenly;

          .information{
            // size
            height: 100%;
            width: 80%;

            div{
              //size
              width: 100%;

              label{
                font-size: 0.9rem;
              }
            }
          }

          .friend{
            // size
            width: 15%;

            button{
              // decoration
              font-size: 0.7rem;
            }
          }
        }
      }
    }

    @media screen and (max-width: 450px) {
          & {
            .container-photo{
              // size
              height: 40%;
            }

            .container-information{
              // size
              height: 60%;

              .information{
                div{
                  label{
                    font-size: 0.8rem;
                  }
                }
              }
            }
          }
        }
  }

  @media screen and (max-width: 600px){
    width: 100%;
  }
}
</style>