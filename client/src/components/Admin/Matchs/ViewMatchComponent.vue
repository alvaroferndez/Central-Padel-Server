<script setup>
import {adminStore} from "../../../stores/Admin/admin";
import {adminMatchStore} from "../../../stores/Admin/adminMatch";
import {authentificationStore} from "../../../stores/authentification";
import {ref} from "vue";

// stores
var admin = adminStore();
var adminMatch = adminMatchStore();
var authentification = authentificationStore();

// variables


// functions
adminMatch.getMatchById(admin.actual_component.props);
</script>


<template>
    <div class="global-container">
        <div class="container" v-if="adminMatch.current_match">
            <section class="container-data">
                <div>
                    <div>
                        <label>Dia</label>
                        <input type="text" v-model="adminMatch.current_match.date" placeholder="22/04/23">
                    </div>
                    <div>
                        <label>Hora</label>
                        <input type="text" v-model="adminMatch.current_match.hour" placeholder="22:00">
                    </div>
                    <div>
                        <label>Pista</label>
                        <input type="text" v-model="adminMatch.current_match.court" placeholder="Campo de futebol">
                    </div>
                </div>
            </section>
            <section class="container-image">
                <div v-for="player of adminMatch.current_match.players">
                    <p>
                        {{ player.email ? player.email : 'sin definir' }}
                    </p>
                </div>
            </section>
        </div>
    </div>
</template>


<style lang="scss">
@import "@/assets/styles.scss";

.global-container {
    // size
    height: 100%;
    width: 100%;

    // display
    @include flexbox();

    .container{
        border: 1px solid $h-c-black;

        // size
        height: 60%;
        width: 80%;
    }

}
</style>