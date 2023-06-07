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

function goHome(){
    admin.changeSubcomponent('home');
    admin.changeProps({});
}
</script>


<template>
    <div class="global-container">
        <button class="go-back" @click="goHome()">
          <v-icon name="bi-arrow-return-left" class="icon" scale="2"/>
        </button>
        <div class="container" v-if="adminMatch.current_match">
            <section class="container-data">
                <div>
                    <div>
                        <label>Dia</label>
                        <span>{{ adminMatch.current_match.date }}</span>
                    </div>
                    <div>
                        <label>Hora</label>
                        <span>{{ adminMatch.current_match.hour }}</span>
                    </div>
                    <div>
                        <label>Pista</label>
                        <span>{{ adminMatch.current_match.court }}</span>
                    </div>
                </div>
            </section>
            <section class="container-image">
                <div v-for="player of adminMatch.current_match.players" class="position">
                    <img :title="player.email ? player.email : 'sin definir'" :src="player.photo ? player.photo : '../../../src/assets/images/profile-photo.webp'" :alt="player.email">
                    <p>{{ player.email ? player.email : 'sin definir' }}</p>
                </div>
            </section>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.global-container {
    // size
    height: 100%;
    width: 100%;

    // display
    @include flexbox(column);

    .go-back{
      @include goBackButton();
    }

    .container{

        // size
        height: 60vh;
        width: 80%;

        // display
        @include flexbox(column);

        // margin
        margin-top: 2%;

        &-data{

            //size
            width: 50%;
            height: 50%;

            // display
            @include flexbox();

            &>div{
                // size
                width: 60%;
                height: 100%;

                // display
                @include flexbox(column, flex-start);

                &>div{
                    // size
                    width: 100%;
                    height: calc(100% / 3);

                    // display
                    @include flexbox();

                    &>label{
                        // size
                        width: 50%;
                        height: 100%;

                        // display
                        @include flexbox();

                        // decoration
                    }

                    &>span{
                        // size
                        width: 50%;
                        height: 100%;

                        // display
                        @include flexbox();
                    }
                }
            }

        }

        &-image{
            //size
            width: 50%;
            height: 50%;

            // decoration
            background-image: url('../../../assets/images/padel-court.webp');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;

            .position{
                // size
                width: 50px;
                height: 50px;

                // display
                @include flexbox(column);

                // decoration
                border-radius: 50%;

                &:nth-child(1){
                    // position
                    position: absolute;
                    top: 10%;
                    left: 30%;
                }

                &:nth-child(2){
                    // position
                    position: absolute;
                    top: 10%;
                    right: 10%;
                }

                &:nth-child(3){
                    // position
                    position: absolute;
                    bottom: 10%;
                    left: 10%;
                }

                &:nth-child(4){
                    // position
                    position: absolute;
                    bottom: 10%;
                    right: 10%;
                }

                img{
                    // size
                    width: 100%;
                    height: 100%;

                    // decoration
                    border-radius: 50%;
                }
            }
        }
    }

}
</style>