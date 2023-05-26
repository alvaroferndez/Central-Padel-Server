import { createRouter, createWebHistory } from 'vue-router';
import {authentificationStore} from "../stores/authentification";

var authentification = undefined;

setTimeout(() => {
  authentification = authentificationStore();
}, 1000)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/Sign-inView.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/match',
      name: 'match',
      component: () => import('../views/MatchView.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    },
    {
      path: '/shop/category',
      name: 'shop-category',
      component: () => import('../components/ShopComponent.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: (to, from, next) => {
        if(authentification.user.logged && authentification.user.admin){
          next()
        } else {
            next({name: 'home'})
        }
      },
      component: () => import('../views/Admin/AdminView.vue')
    },
  ]
})

export default router
