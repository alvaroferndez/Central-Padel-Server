<script setup>
import ProfielMenuComponent from "@/components/ProfileMenuComponent.vue";
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
    <section class="header">
      <ProfielMenuComponent class="menu-profile"/>
      <ProfileHeaderComponent class="header-profile"/>
    </section>
    <section class="body-profile">
      <PersonalInformationComponent class="container" v-if="profile.acutalComponent === 'info'"/>
      <PersonalShopComponent class="container" v-if="profile.acutalComponent === 'shop'" />
      <PersonalMatchsComponent class="container" v-if="profile.acutalComponent === 'match'" />
      <PersonalSettingsComponent class="container" v-if="profile.acutalComponent === 'settings'||  profile.acutalComponent == undefined" />
    </section>
  </section>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.profile{
  // size
  width: 99vw;
  height: 100%;

  // display
  @include flexbox(column, flex-start, flex-start);

  .header{
    // size
    width: 100%;
    height: 30vh;

    // display
    @include flexbox(row,flex-start,flex-start);

    .menu-profile{
      // size
      width: 30%;
      height: 100%;
    }

    &-profile{
      // size
      width: 70%;
      height: 100%;
    }

    @media screen and (max-width: 600px){
      flex-direction: column;
    }
  }

  .body-profile{
    // size
    width: 100%;
    min-height: 60vh;

    // display
    @include flexbox(row, flex-start);

    // decoration
    background: rgb(233,233,233);
    background: linear-gradient(90deg, rgb(241, 241, 241) 0%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(241, 241, 241) 100%);

    // decoration
    border-top:1px solid $h-c-white-shade;

    .container{
      // size
      width: 70%;
      min-height: 45vh;

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