<script setup>
import {authentificationStore} from "../stores/authentification";

// store
const authentification = authentificationStore();

</script>


<template>
  <section class="header-profile">
    <div class="container">
      <div class="container-photo">
        <img v-if="authentification.user.photo" :src="authentification.user.photo" alt="foto de perfil">
        <img v-else src="../assets/images/profile-photo.webp" alt="foto de perfil">
      </div>
      <div class="container-information">
        <div class="information">
          <div>
            <label>Nombre: {{ authentification.user.name }}
              <span v-if="authentification.user.name"></span>
              <span class="undefined" v-else>sin definir</span>
            </label>
          </div>
          <div>
            <label>Email: {{ authentification.user.email }}
              <span v-if="authentification.user.email"></span>
              <span class="undefined" v-else>sin definir</span>
            </label>
          </div>
          <div>
            <label>Nombre de usuario: {{ authentification.user.user_name }}
              <span v-if="authentification.user.user_name"></span>
              <span class="undefined" v-else>sin definir</span>
            </label>
          </div>
        </div>
        <div class="friend">
          <button type="button">Añadir a amigos</button>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.header-profile{

  // display
  @include flexbox();

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

      .information{
        // size
        height: 100%;

        // display
        @include flexbox(column, flex-start, space-around);

        .undefined{
          // decoration
          color: $h-c-white-shade;
          font-style: italic;
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
          height: 50%;
        }

        .container-information{
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
}
</style>