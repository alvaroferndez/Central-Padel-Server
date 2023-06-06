<script setup>
import {ref} from 'vue'
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
  <section class="information-profile">
    <ProfileHeaderComponent class="header-profile"/>
    <section class="body-profile">
      <PersonalInformationComponent class="container" v-if="profile.acutalComponent === 'info'"/>
      <PersonalShopComponent class="container" v-if="profile.acutalComponent === 'shop'"/>
      <PersonalMatchsComponent class="container" v-if="profile.acutalComponent === 'match'"/>
      <PersonalSettingsComponent class="container" v-if="profile.acutalComponent === 'settings' ||  profile.acutalComponent == undefined"/>
    </section>
  </section>
</template>

<style lang="scss" scoped>
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
    height: 35%;
  }

  .body-profile{
    // size
    width: 100%;
    height: 65%;

    // display
    @include flexbox();

    // margin
    padding: 50px 0;

    // decoration
    border-top:1px solid $h-c-white-shade;
    overflow: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }

    .container{
      // size
      width: 80%;
      height: auto;
    }
  }
}
</style>