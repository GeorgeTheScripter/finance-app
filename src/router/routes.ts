import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/categories",
    name: "CategoriesView",
    component: () => import("@/views/CategoriesView.vue"),
  },
  {
    path: "/dashboard",
    name: "DashboardView",
    component: () => import("@/views/DashboardView.vue"),
  },
  {
    path: "/goals",
    name: "GoalsView",
    component: () => import("@/views/GoalsView.vue"),
  },
  {
    path: "/reports",
    name: "ReportsView",
    component: () => import("@/views/ReportsView.vue"),
  },
  {
    path: "/transactions",
    name: "TransactionsView",
    component: () => import("@/views/TransactionsView.vue"),
  },
];

export default routes;
