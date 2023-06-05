<script setup>
import {authentificationStore} from "../../stores/authentification";

// store
const authentification = authentificationStore();

</script>


<template>
  <section class="container">
    <div class="data">
      <h2>Información personal</h2>
      <div>
        <p>Edad:
          <span v-if="authentification.user.age">{{ authentification.user.age }}</span>
          <span class="undefined" v-else>sin definir</span>
        </p>
        <p>Posicion:
          <span v-if="authentification.user.position">{{ authentification.user.position }}</span>
          <span class="undefined" v-else>sin definir</span>
        </p>
        <p>Categoria:
          <span v-if="authentification.user.category">{{ authentification.user.category }}</span>
          <span class="undefined" v-else>sin definir</span>
        </p>
        <p>Años jugados:
          <span v-if="authentification.user.years_played">{{ authentification.user.years_played }}</span>
          <span class="undefined" v-else>sin definir</span>
        </p>
        <p>Club:
          <span v-if="authentification.user.club">{{ authentification.user.club }}</span>
          <span class="undefined" v-else>sin definir</span>
        </p>
        <p>Fecha de creación:
          <span v-if="authentification.user.creation_date">{{ authentification.user.creation_date }}</span>
          <span class="undefined" v-else>sin definir</span>
        </p>
      </div>
    </div>
    <div class="position">
      <h2>Posición favorita</h2>
      <div class="position-image">
        <div v-if="authentification.user.position == 'izquierda'" class="left-top" style="background-image: url('../../assets/images/profile-photo.webp'); scale: 1.5;"></div>
        <div v-else class="left-top"></div>
        <div v-if="authentification.user.position == 'derecha'" class="left-bot" style="background-image: url('../../assets/images/profile-photo.webp'); scale: 1.5;"></div>
        <div v-else class="left-bot"></div>
        <div class="right-top"></div>
        <div class="right-bot"></div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.container{
  // size
  width: 100%;
  height: 100%;

  // display
  @include grid(2, 2);

  .data{
    // size
    height: 100%;

    // display
    grid-column: 1 / 2;
    grid-row: 1 / -1;

    @include flexbox(column);

    h2{
      // size
      width: 100%;
      height: 25%;

      // decoration
      text-align: center;
    }

    &>div{
      // size
      width: 100%;
      height: 75%;

      // display
      @include flexbox(column, flex-start, space-between);

      p{
        // decoration
        font-weight: bold;
        
        .undefined{
          // decoration
          color: $h-c-white-shade;
          font-style: italic;
        }
      }
    }
  }

  .position{

    // size
    width: 100%;
    height: 100%;

    // display
    grid-column: 2 / 3;
    grid-row: 1 / 3;
    @include flexbox(column, center, space-evenly);

    h2{
      // size
      height: 25%;

      // decoration
      text-align: center;
    }

    &-image{
      // size
      width: 100%;
      height: 75%;

      // decoration
      background-image: url("../../assets/images/padel-court.webp");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      &>div{
        // size
        height: 30px;
        width: 30px;

        // position
        position: absolute;

        // decoration
        border: 1px solid $h-c-white;
        border-radius: 50%;
        background-image: url("../../assets/images/profile-photo.webp");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }

      .left-top{
        top: 20%;
        left: 30%;
      }

      .left-bot{
        top: 70%;
        left: 15%;
      }

      .right-top{
        top: 20%;
        right: 15%;
      }

      .right-bot{
        top: 70%;
        right: 15%;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    &{
      // display
      @include grid(1, 3, 1fr, 2fr, 5%);

      .data{
        // size
        height: 100%;

        // display
        grid-column: 1 / -1;
        grid-row: 1 / 2;
      }

      .position{
        // size
        height: 200%;

        // display
        grid-column: 1 / -1;
        grid-row: 2 / 3;

        .position-image{
          // margin
          margin-top: 5%;
        }
      }

      .other{
        // size
        height: 100%;

        // display
        grid-column: 1 / -1;
        grid-row: 3 / -1;
      }
    }
  }
}

</style>