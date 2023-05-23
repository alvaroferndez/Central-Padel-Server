import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authentificationStore } from '../authentification';
import {toastStore} from "../toast";

export const adminShopStore = defineStore('asminShop', () => {
  const url = authentificationStore().url;
  const products = ref([]);
  const toast = toastStore();

  var category_component = ref('any');
  var categories = [
    { title: 'hombre', value:'men'},
    { title: 'mujer', value:'women'},
    { title: 'palas', value:'blade'},
  ]
  var url_server =  'http://localhost:3080/uploads';
  
  // functions
  function changeCategoryComponent(category) {
    category_component.value = category;
  }

  async function getAllProducts() {
    var response = await fetch(url + '/admin/product', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    var data = await response.json();
  }

  async function addProduct(product) {

    let form_data = new FormData();
    form_data.append('name', product.name);
    form_data.append('price', product.price);
    form_data.append('description', product.description);
    form_data.append('category', product.category);
    form_data.append('image', product.image);


    var response = await fetch(url + '/admin/product/add', {
      method: 'POST',
      body: form_data,
    })
    var data = await response.json();

    if (data.success) {
        toast.showSuccess('Producto añadido correctamente');
    }else{
        toast.showError('Ha ocurrido un error');
    }
  }

  return { products, category_component, categories, changeCategoryComponent, addProduct, getAllProducts }
})
