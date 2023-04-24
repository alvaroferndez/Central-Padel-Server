import { ref } from 'vue'
import { defineStore } from 'pinia'


export const adminStore = defineStore('admin', () => {
    var admin_mode = ref(false)
    var actual_component = ref({
        name: 'home',
        subcomponent: 'home',
        props: null,
    })

    function changeActualComponent(value){
        actual_component.value.name = value;
    }

    function changeSubcomponent(value){
        actual_component.value.subcomponent = value;
    }

    function changeProps(value){
        actual_component.value.props = value;
    }

    return { admin_mode, actual_component, changeActualComponent, changeSubcomponent, changeProps }
})
