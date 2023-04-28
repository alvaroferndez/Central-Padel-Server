<script setup>
import {adminStore} from "../../stores/Admin/admin.js";
import ViewUserComponent from "./Users/ViewUserComponent.vue";
import EditUserComponent from "./Users/EditUserComponent.vue";
import HomeUserComponent from "./Users/HomeUserComponent.vue";

// stores
const admin = adminStore();


// functions

</script>


<template>
  <section v-if="admin.actual_component.name == 'users'">
    <ViewUserComponent v-if="admin.actual_component.subcomponent == 'view'"/>
    <EditUserComponent v-if="admin.actual_component.subcomponent == 'edit'"/>
    <HomeUserComponent v-if="admin.actual_component.subcomponent == 'home'"/>
  </section>

</template>


<style lang="scss">
</style>