import LoginPage from "./components/pages/Login/Login";
import UsersPage from "./components/pages/Users/Users";
import Profile from "./components/pages/Profile/Profile";
import List from "./components/pages/List/List";
import React from "react";
import CRMEntity from "./components/CRMEntity/CRMEntity";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Network from "./components/pages/Network/Network";
import ComertialPorpose from "./components/pages/ComertialPurpose/ComertialPurpose";

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
      children: <List type={{ entity: "customers" }} chooseMode showProgress />,
    },
    {
      path: "/dashboard/facilities",
      name: "Facilities",
      children: (
        <List type={{ entity: "facilities", ref: "customers" }} showProgress />
      ),
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
      path: "/dashboard/purpose",
      name: "Commertial Purpose",
      children: <ComertialPorpose />,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      children: <Dashboard />,
    },
  ],
};

export default routes;
