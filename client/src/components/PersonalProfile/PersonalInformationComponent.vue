<script setup>
import {authentificationStore} from "../../stores/authentification";

// store
const authentification = authentificationStore();

</script>


<template>
  <section class="container">
    <div class="data">
      <div>
        <p>Email:
          <span v-if="authentification.user.email">{{ authentification.user.email }}</span>
          <span v-else>sin definir</span>
        </p>
        <p>Email:
          <span v-if="authentification.user.email">{{ authentification.user.email }}</span>
          <span v-else>sin definir</span>
        </p>
        <p>Email:
          <span v-if="authentification.user.email">{{ authentification.user.email }}</span>
          <span v-else>sin definir</span>
        </p>
        <p>Email:
          <span v-if="authentification.user.email">{{ authentification.user.email }}</span>
          <span v-else>sin definir</span>
        </p>
        <p>Email:
          <span v-if="authentification.user.email">{{ authentification.user.email }}</span>
          <span v-else>sin definir</span>
        </p>
        <p>Email:
          <span v-if="authentification.user.email">{{ authentification.user.email }}</span>
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

    // display
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    @include flexbox(column);
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