import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authentificationStore } from '../authentification';

export const adminShopStore = defineStore('asminShop', () => {
  const url = authentificationStore().url;
  const products = ref([]);

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
    console.log(product);
    // var response = await fetch(url + '/admin/product/add', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(product)
    // })
    // var data = await response.json();

    // if (data.success) {
      
    // }
  }

  return { products, category_component, categories, changeCategoryComponent, addProduct, getAllProducts }
})
