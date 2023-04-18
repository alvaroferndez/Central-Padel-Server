<script setup>
import { RouterLink, RouterView,  } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { authentificationStore } from "./stores/authentification";

// stores
const authentification = authentificationStore();

// chech if user is logged
if(localStorage.getItem('user') != null){
  authentification.checkUserLogged(JSON.parse(localStorage['user']));
}

// const regDNI = /(^([0-9]{8,8}(\-)?[A-Z]))$/;
//
// const regPasaporte = /^[A-Z]{1,3}[0-9]{6}[A-Z]?$/i;
//
// const regTelefono = /^(?:(?:\+[0-9]{2,2})?[ ]?[1-9][0-9 ]{8,8})$/;
//
// const regNie = /^[XYZ]-?\d{7}-?[A-Z]$/i;
//
// const regNif = /^[DXYZ]-?\d{7,8}-?[A-Z]$/i;
//
// const regCif = /^([ABCDEFGHJKLMNPQSUVW])-?(\d{7})([0-9A-J])$/i;
//
// const regDniNiePas = /(^([0-9]{8,8}[A-Z])|([A-Z]{1,3}[0-9]{6}[A-Z]?)|([XYZ]-?\d{7}-?[A-Z]))$/i;
//
// console.log('dni ', regDNI.test('77023439G'))
// console.log('dni - ', regDNI.test('77023439-G'))
// console.log('pasaporte ', regPasaporte.test('AB123456'))
// console.log('pasaporte caracter ', regPasaporte.test('AB123456U'))
// console.log('pasaporte 3 letras ', regPasaporte.test('ABD123456'))
// console.log('pasaporte 3 letras caracter', regPasaporte.test('ABD123456T'))
// console.log('telefono ', regTelefono.test('666777788'))
// console.log('telefono +34 ', regTelefono.test('+34 619940797'))
// console.log('nif', regNif.test('Z-12345678-A'))
// console.log('cif', regCif.test('G-29447104'))
//
// console.log('-dni- o pasaporte o nie ', regDniNiePas.test('77023439G'))
// console.log('dni o -pasaporte- o nie ', regDniNiePas.test('AB123456U'))
// console.log('dni o pasaporte o -nie- ', regDniNiePas.test('X-1234567-A'))

</script>


<template>
  <HeaderComponent />

  <main class="main">
    <RouterView />
  </main>

  <FooterComponent/>
</template>

<style lang="scss">
  .main {
    /* margin */
    margin-top: 20vh;
  }
</style>
