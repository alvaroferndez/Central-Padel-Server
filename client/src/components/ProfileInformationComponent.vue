<script setup>
import { ref } from 'vue'
import PersonalInformationComponent from "@/components/PersonalProfile/PersonalInformationComponent.vue";
import PersonalShopComponent from "@/components/PersonalProfile/PersonalShopComponent.vue";
import PersonalMatchsComponent from "@/components/PersonalProfile/PersonalMatchsComponent.vue";
import PersonalSettingsComponent from "@/components/PersonalProfile/PersonalSettingsComponent.vue";
import ProfileHeaderComponent from "@/components/ProfileHeaderComponent.vue";
import {profileStore} from "@/stores/profile.js";


// store
const profile = profileStore();

// variables
</script>


<template>
  <section class="information-profile">
    <ProfileHeaderComponent class="header-profile"/>
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

.information-profile{
  // size
  width: 80%;
  height: 100%;

  // display
  @include flexbox(column);

  .header-profile{
    // size
    width: 100%;
    height: 30%;
  }

  .body-profile{
    // size
    width: 100%;
    height: 70%;

    // display
    @include flexbox();

    // decoration
    border-top:1px solid $h-c-white-shade;

    .container{
      // size
      width: 80%;
      height: 90%;
    }
  }
}
</style>