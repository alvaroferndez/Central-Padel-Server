import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authentificationStore } from '../authentification';
import {toastStore} from "../toast";
import {adminStore} from "./admin";

export const adminShopStore = defineStore('adminShop', () => {
  const products = ref([]);
  const toast = toastStore();
  const admin = adminStore();
  const adminShop = adminShopStore();
  const authentification = authentificationStore();
  const url = authentification.url;

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

    switch (product.category) {
      case 'hombre':
        product.category = 'men';
        break;
      case 'mujer':
        product.category = 'women';
        break;
      case 'palas':
        product.category = 'blade';
        break;
      default:
        break;
    }

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
        var data_size = await addProductSize(data.data.insertId, product.sizes);
        if(data_size.success){
          toast.showSuccess('Producto añadido correctamente');
          admin.actual_component.subcomponent = 'home';
          adminShop.category_component = product.category;
        }else{
          toast.showError('Ha ocurrido un error');
        }
    }else{
        toast.showError('Ha ocurrido un error');
    }
  }

  async function addProductSize(id, sizes) {
    var response = await fetch(url + '/admin/product/add_sizes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        sizes: sizes
      })
    })
    var result = await response.json();
    return result;
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
      var data_size = await editProductSize(product.id, product.sizes);
        if(data_size.success){
          toast.showSuccess('Producto editado correctamente');
          admin.actual_component.subcomponent = 'home';
          adminShop.category_component = product.category;
        }else{
          toast.showError('Ha ocurrido un error');
        }
    }else{
      toast.showError('Ha ocurrido un error');
    }
  }

  async function editProductSize(id, sizes) {
    var response = await fetch(url + '/admin/product/edit_sizes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        sizes: sizes
      })
    })
    var result = await response.json();
    return result;
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

  async function getProductSize(product) {
    var response = await fetch(url + '/admin/product/get_size', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: product
      })
    })
    var result = await response.json();
    return result.data;
  }

  async function getUserProducts(){
    var response = await fetch(url + '/product/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: authentification.user.email
      })
    })
    var result = await response.json();

    if(result.success){
      await result.data.forEach(async (product) => {
        getProductById(product.id_product).then((data) => {
          getImage(data.path).then((image) => {
            data.image = image;
            products.value.push(data);
          })
        })
      });
    }else{
      console.log(result.error);
      toast.showError('Ha ocurrido un error');
    }
  }

  async function getProductById(id){
    var response = await fetch(url + '/product/getById', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      })
    })
    var result = await response.json();
    return result.data;
  }

  async function bookProduct(product, size) {
    let stock = 0;

    const target_size = product.sizes.find(s => s.size === size);

    if(target_size){
      stock = target_size.stock;
    }

    var response = await fetch(url + '/product/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: product,
        size: size,
        stock: stock,
        user : authentification.user.email
      })
    })
    var result = await response.json();

    if(result.success){
      toast.showSuccess('Producto reservado correctamente');
    }else{
      toast.showError('Ha ocurrido un error');
    }
  }

  return { products, category_component, categories, actual_image, actual_product, changeCategoryComponent, addProduct, editProduct, deleteProduct, getAllProducts, getImage, getProductsOfCategory, getProductSize, getUserProducts, bookProduct }
})
