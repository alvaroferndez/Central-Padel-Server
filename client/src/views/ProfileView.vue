<script setup>
import ProfielMenuComponent from "@/components/ProfileMenuComponent.vue";
import ProfileInformationComponent from "@/components/ProfileInformationComponent.vue";
</script>

<template>
  <section class="profile">
    <ProfielMenuComponent/>
    <ProfileInformationComponent/>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/styles.scss";
  .profile{
    // size
    width: 99vw;
    height: 80vh;
    // display
    @include flexbox(row, flex-start);
  }
</style>