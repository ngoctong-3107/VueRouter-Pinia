import CartView from "@/views/CartView.vue";
import HomeView from "@/views/HomeView.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import { createRouter, createWebHistory } from "vue-router";

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
      component: ProductDetails,
    },
  ],
});

export default router;
