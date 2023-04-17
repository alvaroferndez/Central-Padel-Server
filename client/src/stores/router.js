import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from "../router";

export const routerStore = defineStore('router', () => {

    function navigateTo(path) {
        router.push(path)
    }

    return { navigateTo }
})
