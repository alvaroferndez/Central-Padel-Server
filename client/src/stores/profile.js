import { ref } from 'vue'
import { defineStore } from 'pinia'
s

export const profileStore = defineStore('profile', () => {
    var actualComponent = ref('info')

    return { actualComponent }
})
