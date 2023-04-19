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


<style lang="scss">
@import "@/assets/styles.scss";

.profile{
  // size
  width: 100vw;
  height: 90vh;

  // display
  @include flexbox(row, flex-start)
}
</style>