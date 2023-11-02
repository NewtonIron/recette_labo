import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Liste from '../views/liste.vue';
import RecipeDetail from '../views/Detail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/liste/:category', // Utilisez un paramètre pour la catégorie
    name: 'Liste',
    component: Liste,
    props: true, // Passez les paramètres en tant que props au composant Liste
  },
  {
    path: '/detail/:id',
    name: 'RecipeDetail',
    component: RecipeDetail,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});



export default router;
