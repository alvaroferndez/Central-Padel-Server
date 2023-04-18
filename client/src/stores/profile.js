import { ref } from 'vue'
import { defineStore } from 'pinia'


export const profileStore = defineStore('profile', () => {
    var actualComponent = ref('info')

    return { actualComponent }
})
