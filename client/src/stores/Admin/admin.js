import { ref } from 'vue'
import { defineStore } from 'pinia'


export const adminStore = defineStore('admin', () => {
    var admin_mode = ref(false)
    var actual_component = ref({
        name: 'home',
        subcomponent: 'home'
    })

    function changeActualComponent(value){
        actual_component.value.name = value;
    }

    function changeSubcomponent(value){
        actual_component.value.subcomponent = value;
    }

    return { admin_mode, actual_component, changeActualComponent, changeSubcomponent }
})
