<script setup>
import ProfielMenuComponent from "@/components/ProfileMenuComponent.vue";
import ProfileInformationComponent from "@/components/ProfileInformationComponent.vue";
import { ref } from 'vue'
import PersonalInformationComponent from "@/components/PersonalProfile/PersonalInformationComponent.vue";
import PersonalShopComponent from "@/components/PersonalProfile/PersonalShopComponent.vue";
import PersonalMatchsComponent from "@/components/PersonalProfile/PersonalMatchsComponent.vue";
import PersonalSettingsComponent from "@/components/PersonalProfile/PersonalSettingsComponent.vue";
import ProfileHeaderComponent from "@/components/ProfileHeaderComponent.vue";
import {profileStore} from "@/stores/profile.js";


// store
const profile = profileStore();
</script>


<template>
  <section class="profile">
    <div>
      <ProfielMenuComponent class="menu-profile"/>
      <ProfileHeaderComponent class="header-profile"/>
    </div>
    <section class="body-profile">
      <PersonalInformationComponent class="container" v-if="profile.acutalComponent === 'info'"/>
      <PersonalShopComponent class="container" v-if="profile.acutalComponent === 'shop'" />
      <PersonalMatchsComponent class="container" v-if="profile.acutalComponent === 'match'" />
      <PersonalSettingsComponent class="container" v-if="profile.acutalComponent === 'settings'||  profile.acutalComponent == undefined" />
    </section>
  </section>
</template>


<style lang="scss">
@import "@/assets/styles.scss";

.profile{
  // size
  width: 100vw;
  height: auto;

  // display
  @include flexbox(column, flex-start, flex-start);

  div{
    // size
    width: 100%;
    height: 30%;

    @include flexbox(row,flex-start,flex-start);

    .menu-profile{
      // size
      width: 20%;
      height: 100%;
    }

    .header-profile{
      border: 1px solid black;
      // size
      width: 80%;
      height: 100%;
    }
  }

  .body-profile{
    // size
    width: 100%;

    // display
    @include flexbox();

    // decoration
    border-top:1px solid $h-c-white-shade;

    .container{
      // size
      width: 70%;
      height: 90%;

      @media screen and (max-width: 900px) {
        & {
          // size
          width: 95%;
        }
      }
    }
  }

  @media screen and (max-width: 1450px) {
    &{
      // size
      width: 100%;
    }
  }
}
</style>