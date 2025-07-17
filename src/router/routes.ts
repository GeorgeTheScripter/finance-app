import { RouteRecordRaw } from "vue-router";
import { LINKS } from "@/types/navigationTypes";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: LINKS.DASHBOARD,
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
    path: LINKS.REPORTS,
    name: "ReportsView",
    component: () => import("@/views/ReportsView.vue"),
  },
  {
    path: LINKS.TRANSACTIONS,
    name: "TransactionsView",
    component: () => import("@/views/TransactionsView.vue"),
  },
];

export default routes;
