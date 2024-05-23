import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "@/views/TheMainView.vue";
import PlanDetail from "@/components/plan/PlanDetail.vue";

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
    {
      path: "/plan",
      name: "plan",
      component: () => import("@/views/ThePlanView.vue")
    },
    {
      path: "/makePlan",
      name:"makePlan",
      component: () => import("@/components/plan/MakePlan.vue")
    },
    {
      path: "/planDetail/:id",
      name:"planDetail",
      component: PlanDetail
      // component: () => import("@/components/plan/PlanDetail.vue")
    }
    ,
    {
      path: "/spotDetail/:id",
      name:"spotDetail",
      component: () => import("@/components/spot_detail/SpotDetail.vue")
    },
    {
      path: "/spotBoard",
      name:"spotBoard",
      component: () => import("@/components/spot_board/SpotBoard.vue")
    },
    {
      path: "/makeSpotBoard/:id",
      name:"makeSpotBoard",
      component: () => import("@/components/spot_board/MakeSpotBoard.vue")
    },{
      path: "/spotBoardDetail/:id",
      name:"spotBoardDetail",
      component: () => import("@/components/spot_board/SpotBoardDetail.vue")
    },
  ],
});

export default router;
