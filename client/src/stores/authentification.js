import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const authentificationStore = defineStore('authentification', () => {
    const all = {
        "getLocation": () => {return(createWebHistory())},
    }

    return { all }
})
