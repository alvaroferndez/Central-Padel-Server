<script setup>
import {adminStore} from "../../stores/Admin/admin.js";
import AddMatchComponent from "./Matchs/AddMatchComponent.vue";
import EditMatchComponent from "./Matchs/EditMatchComponent.vue";
import HomeMatchComponent from "./Matchs/HomeMatchComponent.vue";

// stores
const admin = adminStore();


// functions

</script>


<template>
  <section v-if="admin.actual_component.name == 'matchs'">
    <AddMatchComponent v-if="admin.actual_component.subcomponent == 'add'"/>
    <EditMatchComponent v-if="admin.actual_component.subcomponent == 'edit'"/>
    <HomeMatchComponent v-if="admin.actual_component.subcomponent == 'home'"/>
  </section>

</template>


<style lang="scss">
</style>