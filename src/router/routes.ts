import { RouteRecordRaw } from "vue-router";
import { LINKS } from "@/types/navigationTypes";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: LINKS.SIGNUP,
  },
  {
    path: LINKS.CATEGORIES,
    name: "CategoriesView",
    component: () => import("@/views/CategoriesView.vue"),
  },
  {
    path: LINKS.DASHBOARD,
    name: "DashboardView",
    component: () => import("@/views/DashboardView.vue"),
  },
  {
    path: LINKS.GOALS,
    name: "GoalsView",
    component: () => import("@/views/GoalsView.vue"),
  },
  {
    path: LINKS.TRANSACTIONS,
    name: "TransactionsView",
    component: () => import("@/views/TransactionsView.vue"),
  },
  {
    path: LINKS.SIGNUP,
    name: "SignUpView",
    component: () => import("@/views/SignUp.vue"),
  },
];

export default routes;
