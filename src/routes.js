import UsersPage from "./pages/Users";
import Profile from "./pages/Profile";
import List from "./components/List/List";
import React from "react";
import CRMEntity from "./components/CRMEntity/CRMEntity";
import StatisticsDashboard from "./pages/StatisticsDashboard/StatisticsDashboard";
import Network from "./pages/Network/Network";
import ComertialPorpose from "./pages/ComertialPurpose";

const routes = [
  {
    path: "/users",
    name: "Users Page",
    children: <UsersPage />,
  },
  {
    path: "/profile",
    name: "Profile Page",
    children: <Profile />,
  },
  {
    path: "/customers/:id",
    name: "Customer",
    children: <CRMEntity type={{ entity: "customer" }} />,
  },
  {
    path: "/facilities/:id",
    name: "Facility",
    children: <CRMEntity type={{ entity: "facility" }} />,
  },
  {
    path: "/locations/:id",
    name: "Location",
    children: <CRMEntity type={{ entity: "location" }} />,
  },
  {
    path: "/equipment/:id",
    name: "Equipment",
    children: <CRMEntity type={{ entity: "equipment" }} />,
  },
  {
    path: "/customers",
    name: "Customers",
    children: (
      <List
        type={{ entity: "customers" }}
        title="Customers"
        chooseMode
        showProgress
      />
    ),
  },
  {
    path: "/facilities",
    name: "Facilities",
    children: (
      <List
        type={{ entity: "facilities", ref: "customers" }}
        title="Facilities"
        showProgress
      />
    ),
  },
  {
    path: "/locations",
    name: "Locations",
    children: (
      <List
        type={{ entity: "locations", ref: "facilities" }}
        title="Locations"
      />
    ),
  },
  {
    path: "/equipment",
    name: "Equipment",
    children: (
      <List
        type={{ entity: "equipment", ref: "locations" }}
        title="Equipment"
      />
    ),
  },
  {
    path: "/network",
    name: "Network",
    children: <Network />,
  },
  {
    path: "/purpose",
    name: "Commertial Purpose",
    children: <ComertialPorpose />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    children: <StatisticsDashboard />,
  },
];

export default routes;
