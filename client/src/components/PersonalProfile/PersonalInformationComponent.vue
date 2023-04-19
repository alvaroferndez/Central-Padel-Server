<script setup>
import {authentificationStore} from "../../stores/authentification";

// store
const authentification = authentificationStore();

</script>


<template>
  <section class="container">
    <div class="data">
      <div>
        <p>Edad:
          <span v-if="authentification.user.age">{{ authentification.user.age }}</span>
          <span v-else>sin definir</span>
        </p>
        <p>Posicion:
          <span v-if="authentification.user.position">{{ authentification.user.position }}</span>
          <span v-else>sin definir</span>
        </p>
        <p>Categoria:
          <span v-if="authentification.user.category">{{ authentification.user.category }}</span>
          <span v-else>sin definir</span>
        </p>
        <p>Años jugados:
          <span v-if="authentification.user.years_played">{{ authentification.user.years_played }}</span>
          <span v-else>sin definir</span>
        </p>
        <p>Club:
          <span v-if="authentification.user.club">{{ authentification.user.club }}</span>
          <span v-else>sin definir</span>
        </p>
        <p>Fecha de creación:
          <span v-if="authentification.user.creation_date">{{ authentification.user.creation_date }}</span>
          <span v-else>sin definir</span>
        </p>
      </div>
    </div>
    <div class="position">
      <h3>Posición favorita</h3>
      <div class="position-image">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div></div>
  </section>

</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.container{
  // display
  @include grid(2, 2);

  .data{
    border: 1px solid black;
    // size

    // display
    grid-column: 1 / 2;
    grid-row: 1 / -1;

    @include flexbox();

    &>div{
      // size
      width: 100%;
      height: 80%;

      // display
      @include flexbox(column, flex-start, space-between);

    }
  }

  .position{
    border: 1px solid black;

    // size
    width: 100%;
    height: 100%;

    // display
    grid-column: 2 / 3;
    grid-row: 1 / 2;

    h3{
      // size
      height: 10%;

      // decoration
      text-align: center;
    }

    &-image{
      // size
      width: 100%;
      height: 90%;

      // decoration
      background-image: url("../../assets/images/padel-court.webp");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

}

</style>