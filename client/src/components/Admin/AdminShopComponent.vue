<script setup>
import {adminStore} from "../../stores/Admin/admin.js";
import ViewProductComponent from "./Products/ViewProductComponent.vue";
import EditProductComponent from "./Products/EditProductComponent.vue";
import HomeProductComponent from "./Products/HomeProductComponent.vue";
import AddProductComponent from "./Products/AddProductComponent.vue";

// stores
const admin = adminStore();
</script>


<template>
  <section v-if="admin.actual_component.name == 'shops'">
    <ViewProductComponent v-if="admin.actual_component.subcomponent == 'view'"/>
    <EditProductComponent v-if="admin.actual_component.subcomponent == 'edit'"/>
    <HomeProductComponent v-if="admin.actual_component.subcomponent == 'home'"/>
    <AddProductComponent v-if="admin.actual_component.subcomponent == 'add'"/>
  </section>
</template>


<style lang="scss"></style>