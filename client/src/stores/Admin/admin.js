import { ref } from 'vue'
import { defineStore } from 'pinia'
import { adminShopStore } from './adminShop'


export const adminStore = defineStore('admin', () => {
    var admin_mode = ref(false)
    var actual_component = ref({
        name: 'users',
        subcomponent: 'home',
        props: null,
    })
    var adminShop = adminShopStore();

    function changeActualComponent(value){
        actual_component.value.name = value;
        changeSubcomponent('home');
        if(value == 'shops'){
            adminShop.changeCategoryComponent('any');
        }
    }

    function changeSubcomponent(value){
        actual_component.value.subcomponent = value;
    }

    function changeProps(value){
        actual_component.value.props = value;
    }

    return { admin_mode, actual_component, changeActualComponent, changeSubcomponent, changeProps }
})
