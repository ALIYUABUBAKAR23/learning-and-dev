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
  MdGroupWork,
  MdMoney,

} from "react-icons/md";

// Admin Imports
import MainDashboard from "./views/admin/default";
import NFTMarketplace from "./views/admin/marketplace";
import Profile from "./views/admin/profile";
import DataTables from "./views/admin/dataTables";
import RTL from "./views/admin/rtl";
import Projects from "./views/admin/projects";
import Task from "./views/admin/tasks";
import Inventory from "./views/admin/inventory";
import Item from "./views/admin/items";
import HumanResources from "./views/admin/hr";
import Departments from "./views/admin/departments";
import Contract from "./views/admin/contracts";
import Accounting from "./views/admin/accounting";
import crm from "./views/admin/crm";


// Auth Imports
import SignInCentered from "./views/auth/signIn";

const routes = [
  {
    name: "Accounting",
    layout: "/admin",
    icon: <Icon as={MdGroupWork} width="20px" height="20px" color="inherit" />,
    path: "/accounting",
    component: Accounting,
  },
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

    name: "Contracts",
    layout: "/admin",
    icon: <Icon as={MdReceipt} width="20px" height="20px" color="inherit" />,
    path: "/contracts",
    component: Contract,
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
  {
    name: "CRM",
    layout: "/admin",
    icon: <Icon as={MdGroupWork} width="20px" height="20px" color="inherit" />,
    path: "/crm",
    component: CRM,
  },
];

export default routes;
