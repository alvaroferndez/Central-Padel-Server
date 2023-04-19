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
            <input type="text" v-model="authentification.user.email" placeholder="sin definir"/>
          </div>
          <div>
            <label>Teléfono</label>
            <input type="text" v-model="authentification.user.phone" placeholder="sin definir"/>
          </div>
          <div>
            <label>Edad</label>
            <input type="text" v-model="authentification.user.age" placeholder="sin definir"/>
          </div>

          <div>
            <label>Dni</label>
            <input type="text" v-model="authentification.user.dni" placeholder="sin definir"/>
          </div>
          <div>
            <label>Fecha de creación</label>
            <input type="text" v-model="authentification.user.creation_date"/>
          </div>
          <div class="password">
            <button>Cambiar contraseña</button>
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

.container{
  // display
  @include flexbox(column, center, space-around);

  &-options{
    // size
    width: 100%;
    height: 90%;

    // display
    @include flexbox(row, center, space-around);

    .options{
      // size
      width: 45%;
      height: 90%;

      h1{
        // size
        height: 15%;

        // decoration
        text-align: center;
      }

      &>div{
        // display
        @include flexbox(column, flex-start, space-around);
        // size
        width: 100%;
        height: 80%;

        &>div{
          // size
          width: 80%;

          // margin
          padding-left: 10%;

          // display
          @include flexbox(row, center, space-between);

          label, input{
            // size
            width: 50%;
          }

          input{
            // decoration
            border: none;
            outline: none;

            &:focus{
              border-bottom: 1px solid black;
            }
          }
        }

        .password{
          // display
          @include flexbox(row, center, space-around);
        }
      }
    }
  }

}

</style>