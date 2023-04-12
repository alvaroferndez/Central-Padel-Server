import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


export const shopStore = defineStore('shop', () => {
  const all = {
    "products": () => {console.log(axios)},
  }

  return { all }
})
