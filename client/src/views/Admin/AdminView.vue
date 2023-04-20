<script setup>
import {adminStore} from "../../stores/Admin/admin.js";
import AdminHomeComponent from "../../components/Admin/AdminHomeComponent.vue";
import AdminShopComponent from "../../components/Admin/AdminShopComponent.vue";
import AdminMatchsComponent from "../../components/Admin/AdminMatchsComponent.vue";
import AdminUsersComponent from "../../components/Admin/AdminUsersComponent.vue";

// stores
const admin = adminStore();
</script>


<template>
  <AdminHomeComponent v-if="admin.actual_component.name == 'home'"/>
  <AdminShopComponent v-if="admin.actual_component.name == 'shop'"/>
  <AdminMatchsComponent v-if="admin.actual_component.name == 'matchs'"/>
  <AdminUsersComponent v-if="admin.actual_component.name == 'users'"/>
</template>


<style lang="scss"></style>