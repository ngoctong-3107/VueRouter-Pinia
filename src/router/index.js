import CartView from "@/views/CartView.vue";
import HomeView from "@/views/HomeView.vue";
import { default as ProductDetailsView } from "@/views/ProductDetailsView.vue";
import { createRouter, createWebHistory } from "vue-router";
import ProfileView from "../views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetailsView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
