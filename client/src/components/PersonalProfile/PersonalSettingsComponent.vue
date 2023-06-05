<script setup>
import {authentificationStore} from "../../stores/authentification";
import {ref} from 'vue'

// store
const authentification = authentificationStore();

var email = JSON.parse(localStorage['user']);
var can_edit = ref(false);

function onInput(){
  can_edit.value = true;
}

function changeData(){
  authentification.changeData();
  can_edit.value = false;
}

function reset(){
  authentification.checkUserLogged(email, false);
  can_edit.value = false;
}

function uploadImage(e){
  authentification.uploadImage(e.target.files[0]);
}
</script>


<template>
  <section class="container">
    <section class="container-options">
      <div class="options" v-on:input="onInput">
        <h1>Personal</h1>
        <div>
          <div>
            <label>Nombre</label>
            <input type="text" v-model="authentification.user.name" placeholder="sin definir"/>
          </div>
          <div>
            <label>Nombre de usuario</label>
            <input type="text" v-model="authentification.user.user_name" placeholder="sin definir"/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" v-model="authentification.user.email" placeholder="sin definir"/>
          </div>
          <div>
            <label>Teléfono</label>
            <input type="tel" v-model="authentification.user.phone" placeholder="sin definir"/>
          </div>
          <div>
            <label>Edad</label>
            <input type="number" v-model="authentification.user.age" placeholder="sin definir"/>
          </div>
          <div>
            <label>Dni</label>
            <input type="text" v-model="authentification.user.dni" placeholder="sin definir"/>
          </div>
          <div>
            <form action="" enctype="multipart/form-data">
              <label>Foto de perfil</label>
              <input type="file" name="image" v-on:change="uploadImage($event)"/>
            </form>
          </div>
          <div>
            <label>Fecha de creación</label>
            <span>{{ authentification.user.creation_date }}</span>
          </div>
          <div class="password">
            <button class="button-password">Cambiar contraseña</button>
          </div>
        </div>
      </div>
      <div class="options" v-on:input="onInput">
        <h1>Padel</h1>
        <div>
          <div>
            <label>Posición</label>
            <input type="text" v-model="authentification.user.position" placeholder="sin definir"/>
          </div>
          <div>
            <label>Categoría</label>
            <input type="text" v-model="authentification.user.category" placeholder="sin definir"/>
          </div>
          <div>
            <label>Club</label>
            <input type="text" v-model="authentification.user.club" placeholder="sin definir"/>
          </div>
          <div>
            <label>Años jugados</label>
            <input type="text" v-model="authentification.user.years_played" placeholder="sin definir"/>
          </div>
          <div>
            <label>Experiencia</label>
            <input type="text" v-model="authentification.user.experience" placeholder="sin definir"/>
          </div>
        </div>
      </div>
    </section>
    <div v-if="can_edit">
      <button class="change-data" v-on:click="changeData()">Guardar Cambios</button>
      <button class="change-data" v-on:click="reset()">Reestablecer</button>
    </div>
  </section>

</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.container {
  // display
  @include flexbox(column, center, space-around);

  &-options {
    // size
    width: 100%;
    height: 90%;

    // display
    @include flexbox(row, flex-start, space-around);

    .options {
      // size
      width: 45%;
      height: 90%;

      h1 {
        // size
        height: 20%;

        // decoration
        text-align: center;
      }

      & > div {
        // display
        @include flexbox(column, flex-start, space-around);
        // size
        width: 100%;
        height: 80%;

        & > div {
          // size
          width: 100%;

          // margin
          padding-left: 10%;
          margin-bottom: 1rem;

          // display
          @include flexbox(row, center, space-between);

          label, input, span {
            // size
            width: 50%;
          }

          label{
            font-weight: bold;
          }

          input {
            // decoration
            border: none;
            outline: none;
            background-color: transparent;

            &:focus {
              // decoration
              border-bottom: 1px solid black;
            }

            &::placeholder{
              // decoration
              font-style: italic;
              color: $h-c-white-shade;
            }
          }

          form{
            @include flexbox(row, center, space-between);

            label, input {
              // size
              width: 50%;
            }
          }
        }

        .password {
          // display
          @include flexbox(row, center, space-around);

          // margin
          margin-top: 1rem;

          .button-password{
            @include button();
          }
        }
      }
    }
  }

  &>div{
    // size
    width: 100%;
    height: 10%;

    // display
    @include flexbox(row, center, space-evenly);

    button {
      // size
      min-height: 40px;

      // display
      display: inline-block;
      vertical-align: middle;

      // margin
      padding: 12px 14px;

      // decoration
      background: $h-c-red-ligth-tint;
      border: 1px solid $h-c-red-ligth-tint;
      border-radius: 6px;
      box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
      box-sizing: border-box;
      color: $h-c-white;
      cursor: pointer;
      font-weight: 800;
      line-height: 16px;
      outline: 0;
      text-align: center;

      &:hover, &:active{
        background-color: $h-c-white;
        background-position: 0 0;
        color: $h-c-red-ligth-tint;
      }

      &:active{
        opacity: .5;
      }
    }
  }

  @media screen and (max-width: 700px) {
    &-options {
      // display
      flex-direction: column;

      .options {
        // size
        width: 90%;
      }
    }
  }

  @media screen and (max-width: 550px) {
    &-options {
      .options {
        
        h1{
          //decoration
          font-size: 1.7rem;
        }

        &> div {
          & > div {
            label, input {
              // decoration
              font-size: 0.7rem;
              }
            }
          }
      }
    }

    button {
      // decoration
      font-size: 0.7rem;
    }
  }
}
</style>