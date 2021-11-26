import LoginPage from "./components/pages/Login/Login";
import UsersPage from "./components/pages/Users/Users";
import Profile from "./components/pages/Profile/Profile";
import AddUserPage from "./components/pages/Users/AddUser/AddUser";
import CustomerCreate from "./components/pages/CustomerCreate/CustomerCreate";
import List from "./components/pages/List/List";
import React from "react";
import CRMEntity from "./components/CRMEntity/CRMEntity";

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
      path: "/dashboard/add-user",
      name: "Add User",
      children: <AddUserPage />,
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
      name: "Factories",
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
  ],
};

export default routes;