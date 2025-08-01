import { ref, Ref } from "vue";
import CategoryIcon from "@/assets/navigation-icons/Category.svg";
import DashboardIcon from "@/assets/navigation-icons/Dashboard.svg";
import GoalIcon from "@/assets/navigation-icons/Profile.svg";
import TransactionIcon from "@/assets/navigation-icons/Transactions.svg";

export type Link = {
  path: string;
  icon?: string;
};

export const LINKS = {
  CATEGORIES: "/categories",
  TRANSACTIONS: "/transactions",
  GOALS: "/goals",
  DASHBOARD: "/dashboard",
  REPORTS: "/reports",
  SIGNUP: "/signup",
  SIGNIN: "/signin",
} as const;

export const links: Ref<Link[]> = ref([
  { path: LINKS.DASHBOARD, icon: DashboardIcon },
  { path: LINKS.CATEGORIES, icon: CategoryIcon },
  { path: LINKS.GOALS, icon: GoalIcon },
  { path: LINKS.TRANSACTIONS, icon: TransactionIcon },
  { path: LINKS.SIGNUP },
  { path: LINKS.SIGNIN },
]);
