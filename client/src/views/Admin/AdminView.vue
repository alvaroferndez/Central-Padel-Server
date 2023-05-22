<script setup>
import {adminStore} from "../../stores/Admin/admin.js";
import AdminShopComponent from "../../components/Admin/AdminShopComponent.vue";
import AdminMatchsComponent from "../../components/Admin/AdminMatchsComponent.vue";
import AdminUsersComponent from "../../components/Admin/AdminUsersComponent.vue";

// stores
const admin = adminStore();
</script>


<template>
  <AdminShopComponent v-if="admin.actual_component.name == 'shops'"/>
  <AdminMatchsComponent v-if="admin.actual_component.name == 'matchs'"/>
  <AdminUsersComponent v-if="admin.actual_component.name == 'users'"/>
</template>


<style lang="scss">

template{
@import "@/assets/styles.scss";

  background-color: $h-c-white;
  background-image: none;
}
</style>