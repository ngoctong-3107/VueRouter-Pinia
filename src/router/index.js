import CartView from "@/views/CartView.vue";
import HomeView from "@/views/HomeView.vue";
import { default as ProductDetailsView } from "@/views/ProductDetailsView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
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
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Lấy store quản lý trạng thái đăng nhập

  // Kiểm tra nếu route yêu cầu đăng nhập và người dùng chưa đăng nhập
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/"); // Chuyển hướng về trang chủ (hoặc trang đăng nhập)
  } else {
    next(); // Tiếp tục điều hướng nếu đã đăng nhập hoặc route không yêu cầu đăng nhập
  }
});
export default router;
