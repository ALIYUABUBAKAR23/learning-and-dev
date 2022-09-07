import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdWork,
  MdOutlineShoppingCart,
  MdShoppingBasket,
  MdReceipt,
  MdLocalPostOffice,
  MdGroupWork,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "./views/admin/default";
import NFTMarketplace from "./views/admin/marketplace";
import Profile from "./views/admin/profile";
import DataTables from "./views/admin/dataTables";
import RTL from "./views/admin/rtl";
import Projects from "./views/admin/projects";
import Task from "./views/admin/tasks"
import Inventory from "./views/admin/inventory"
import Item from "./views/admin/items"
import HumanResources from "./views/admin/hr"
import Departments from "./views/admin/departments";


// Auth Imports
import SignInCentered from "./views/auth/signIn";
import Project from "./views/admin/profile/components/Project";
import departments from "./views/admin/departments";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: RTL,
  },
  {
    name: "Tasks",
    layout: "/admin",
    path: "/tasks",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: Task,
  },
  {
    name: "Inventory",
    layout: "/admin",
    path: "/inventory",
    icon: <Icon as={MdShoppingBasket} width="20px" height="20px" color="inherit" />,
    component: Inventory,
  },
  {
    name: "Items",
    layout: "/admin",
    path: "/items",
    icon: <Icon as={MdShoppingBasket} width="20px" height="20px" color="inherit" />,
    component: Item,
  },
  {
    name: "Projects",
    layout: "/admin",
    icon: <Icon as={MdWork} width="20px" height="20px" color="inherit" />,
    path: "/projects",
    component: Projects,
  },
  {
    name: "Human Resources",
    layout: "/admin",
    icon: <Icon as={MdReceipt} width="20px" height="20px" color="inherit" />,
    path: "/hr",
    component: HumanResources,
  },
  {
    name: "Departments",
    layout: "/admin",
    icon: <Icon as={MdGroupWork} width="20px" height="20px" color="inherit" />,
    path: "/departments",
    component: Departments,
  },
];

export default routes;
