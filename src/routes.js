import LoginPage from "./components/pages/LoginPage/LoginPage";
import UsersPage from "./components/pages/UsersPage/UsersPage";
import Profile from "./components/pages/Profile/Profile";
import AddUserPage from "./components/pages/UsersPage/AddUserPage/AddUserPage";
import Customer from "./components/pages/Customer/Customer";
import CustomerCreate from "./components/pages/CustomerCreate/CustomerCreate";
import List from "./components/pages/List/List";
import React from "react";
import FacilityCreate from "./components/pages/FacilityCreate/FacilityCreate";

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
      path: "/dashboard/customers/:id/facilities/create",
      name: "Facility Create",
      children: <FacilityCreate />,
    },
    {
      path: "/dashboard/customers/:id/facilities",
      name: "Customer Facilities",
      children: <List type={{ entity: "facilities", ref: "customers" }} />,
    },
    {
      path: "/dashboard/customers/:id/facilities",
      name: "Customer Facilities",
      children: <List type={{ entity: "facilities", ref: "customers" }} />,
    },
    {
      path: "/dashboard/customers/:id/locations",
      name: "Customer Locations",
      children: <List type={{ entity: "locations", ref: "customers" }} />,
    },
    {
      path: "/dashboard/customers/:id/equipment",
      name: "Customer Equipment",
      children: <List type={{ entity: "equipment", ref: "customers" }} />,
    },
    {
      path: "/dashboard/customers/:id",
      name: "Customer",
      children: <Customer type={{ entity: "customers", ref: "customers" }} />,
    },
    {
      path: "/dashboard/customers",
      name: "Customers",
      children: <List type={{ entity: "customers" }} />,
    },
    {
      path: "/dashboard/facilities/:id/equipment",
      name: "Factory Equipment",
      children: <List type={{ entity: "equipment", ref: "facilities" }} />,
    },
    {
      path: "/dashboard/facilities/:id/locations",
      name: "Factory Locations",
      children: <List type={{ entity: "locations", ref: "facilities" }} />,
    },
    {
      path: "/dashboard/facilities/:id",
      name: "Facility",
      children: <div></div>,
    },
  ],
};

export default routes;
