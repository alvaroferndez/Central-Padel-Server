import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authentificationStore } from '../authentification';
import {toastStore} from "../toast";
import {adminStore} from "./admin";

export const adminShopStore = defineStore('adminShop', () => {
  const url = authentificationStore().url;
  const products = ref([]);
  const toast = toastStore();
  const admin = adminStore();
  const adminShop = adminShopStore();

  var category_component = ref('any');
  var categories = [
    { title: 'hombre', value:'men'},
    { title: 'mujer', value:'women'},
    { title: 'palas', value:'blade'},
  ]
  var actual_product = ref({});
  var actual_image = ref('');
  
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
    return data;
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
        admin.actual_component.subcomponent = 'home';
        adminShop.category_component = product.category;
    }else{
        toast.showError('Ha ocurrido un error');
    }
  }

  async function editProduct(product) {


    let form_data = new FormData();
    form_data.append('id', product.id);
    form_data.append('name', product.name);
    form_data.append('price', product.price);
    form_data.append('description', product.description);
    form_data.append('category', product.category);

    if(product.image){
      if(!compareImages(product.image.name, product.path)){
        form_data.append('image', product.image);
      }
    }

    var response = await fetch(url + '/admin/product/edit', {
      method: 'POST',
      body: form_data,
    })
    var result = await response.json();

    if(result.success){
      toast.showSuccess('Producto editado correctamente');
      admin.actual_component.subcomponent = 'home'
      adminShop.category_component = product.category;
    }else{
      toast.showError('Ha ocurrido un error');
    }
  }

  async function deleteProduct(product) {
    var response = await fetch(url + '/admin/product/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: product
      })
    })
    var result = await response.json();
    
    if(result.success){
      toast.showSuccess('Producto eliminado correctamente');
      admin.actual_component.subcomponent = 'home';
      adminShop.category_component = 'any';
    }else{
      toast.showError('Ha ocurrido un error');
    }
  }


  function compareImages(image, path){
    if(image.split('.')[0] == path.split('/')[1].split('-')[0]){
      return true;
    }
    return false;
  }
  
  async function getImage(image){
    let new_image = image.split('.')[0] + '/' + image.split('.')[1]
    var response = await fetch(url + '/admin/product/image', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: new_image
      })
    }).then(response => response.blob())
    .then(blob => URL.createObjectURL(blob))
    .catch(error => console.log(error));
    return response;
  }

  async function getProductsOfCategory(category) {
    var response = await fetch(url + '/admin/product/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: category
      })
    })
    var result = await response.json();
    return result.data;
  }

  return { products, category_component, categories, actual_image, actual_product, changeCategoryComponent, addProduct, editProduct, deleteProduct, getAllProducts, getImage, getProductsOfCategory }
})
