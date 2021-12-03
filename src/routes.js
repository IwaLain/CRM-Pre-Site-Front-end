import LoginPage from "./components/pages/Login/Login";
import UsersPage from "./components/pages/Users/Users";
import Profile from "./components/pages/Profile/Profile";
import CustomerCreate from "./components/ModalComponent/Modals/CustomerCreate/CustomerCreate";
import List from "./components/pages/List/List";
import React from "react";
import CRMEntity from "./components/CRMEntity/CRMEntity";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Network from "./components/pages/Network/Network";
import UIKit from "./components/UIKit/UIKit";
import ComertialPorpouse from "./components/pages/ComertialPurpouse/ComertialPurpouse";

const routes = {
  auth: [
    {
      path: "/login",
      name: "Login",
      children: <LoginPage />,
    },
  ],
  dashboard: [
    {
      path: "/dashboard/users",
      name: "Users Page",
      children: <UsersPage />,
    },
    {
      path: "/dashboard/profile",
      name: "Profile Page",
      children: <Profile />,
    },
    {
      path: "/dashboard/customers/create",
      name: "Customer Create",
      children: <CustomerCreate />,
    },
    {
      path: "/dashboard/customers/:id",
      name: "Customer",
      children: <CRMEntity type={{ entity: "customer" }} />,
    },
    {
      path: "/dashboard/facilities/:id",
      name: "Facility",
      children: <CRMEntity type={{ entity: "facility" }} />,
    },
    {
      path: "/dashboard/locations/:id",
      name: "Location",
      children: <CRMEntity type={{ entity: "location" }} />,
    },
    {
      path: "/dashboard/equipment/:id",
      name: "Equipment",
      children: <CRMEntity type={{ entity: "equipment" }} />,
    },
    {
      path: "/dashboard/customers",
      name: "Customers",
      children: <List type={{ entity: "customers" }} />,
    },
    {
      path: "/dashboard/facilities",
      name: "Facilities",
      children: <List type={{ entity: "facilities", ref: "customers" }} />,
    },
    {
      path: "/dashboard/locations",
      name: "Locations",
      children: <List type={{ entity: "locations", ref: "facilities" }} />,
    },
    {
      path: "/dashboard/equipment",
      name: "Equipment",
      children: <List type={{ entity: "equipment", ref: "locations" }} />,
    },
    {
      path: "/dashboard/network",
      name: "Network",
      children: <Network />,
    },
    {
      path: "/dashboard/purpouse",
      name: "Commertial Purpose",
      children: <ComertialPorpouse />,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      children: <Dashboard />,
    },
  ],
};

export default routes;
