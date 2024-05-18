import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "@/views/TheMainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMainView,
    },
    
    {
      path: "/map",
      name: "map",
      component: () => import("@/views/MapView.vue"),
    },
    {
      path: "/mapTest",
      name: "mapTest",
      component: () => import("@/views/TheMapView.vue"),
    },
    {
      path: "/bootstrapTest",
      name: "bootstrapTest",
      component: () => import("@/views/bootstrapTest.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/components/users/UserLogin.vue"),
    },
    {
      path: "/join",
      name: "join",
      component: () => import("@/components/users/UserRegister.vue"),
    },
    {
      path: "/mypage",
      name: "mypage",
      // beforeEnter: onlyAuthUser,
      component: () => import("@/components/users/UserMyPage.vue"),
    },
  ],
});

export default router;
