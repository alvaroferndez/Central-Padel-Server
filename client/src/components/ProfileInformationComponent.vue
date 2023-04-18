<script setup>
import { ref } from 'vue'
import PersonalInformationComponent from "@/components/PersonalProfile/PersonalInformationComponent.vue";
import PersonalShopComponent from "@/components/PersonalProfile/PersonalShopComponent.vue";
import PersonalMatchsComponent from "@/components/PersonalProfile/PersonalMatchsComponent.vue";
import PersonalSettingsComponent from "@/components/PersonalProfile/PersonalSettingsComponent.vue";
import {profileStore} from "@/stores/profile.js";

// store
const profile = profileStore();

// variables
</script>


<template>
  <section class="information-profile">
    <section class="header-profile"></section>
    <section class="body-profile">
      <PersonalInformationComponent v-if="profile.acutalComponent === 'info'" />
      <PersonalShopComponent v-if="profile.acutalComponent === 'shop'" />
      <PersonalMatchsComponent v-if="profile.acutalComponent === 'match'" />
      <PersonalSettingsComponent v-if="profile.acutalComponent === 'settings'" />
    </section>
  </section>

</template>


<style lang="scss">
@import "@/assets/styles.scss";

.information-profile{
  // size
  width: 80%;
  height: 80vh;

  // display
  @include flexbox(column);

  .header-profile{
    border: 1px solid black;
    // size
    width: 100%;
    height: 35%;
  }

  .body-profile{
    border: 1px solid black;
    // size
    width: 100%;
    height: 65%;
  }
}
</style>