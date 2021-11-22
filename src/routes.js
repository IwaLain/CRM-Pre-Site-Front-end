import LoginPage from "./components/pages/LoginPage/LoginPage";
import UsersPage from "./components/pages/UsersPage/UsersPage";
import Profile from "./components/pages/Profile/Profile";
import AddUserPage from "./components/pages/UsersPage/AddUserPage/AddUserPage";
import Customers from "./components/pages/Customers/Customers";
import Customer from "./components/pages/Customer/Customer";
import CustomerCreate from "./components/pages/CustomerCreate/CustomerCreate";
import CustomerFactories from "./components/pages/CustomerFactories/CustomerFactories";
import CustomerLocations from "./components/pages/CustomerLocations/CustomerLocations";
import CustomerEquipment from "./components/pages/CustomerEquipment/CustomerEquipment";
import Factory from "./components/pages/Factory/Factory";
import FactoryLocations from "./components/pages/FactoryLocations/FactoryLocations";
import FactoryEquipment from "./components/pages/FactoryEquipment/FactoryEquipment";
import Location from "./components/pages/Location/Location";
import LocationEquipment from "./components/pages/LocationEquipment/LocationEquipment";
import Equipment from "./components/pages/Equipment/Equipment";

const routes = {
  auth: [
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
  ],
  dashboard: [
    {
      path: "/dashboard/users",
      name: "Users Page",
      component: UsersPage,
    },
    {
      path: "/dashboard/profile",
      name: "Profile Page",
      component: Profile,
    },
    {
      path: "/dashboard/add-user",
      name: "Add User",
      component: AddUserPage,
    },
    {
      path: "/dashboard/customers/:id",
      name: "Customer",
      component: Customer,
    },
    {
      path: "/dashboard/customers",
      name: "Customers",
      component: Customers,
    },
    {
      path: "/dashboard/customers/create",
      name: "Customer Create",
      component: CustomerCreate,
    },
    {
      path: "/dashboard/customers/:id/facilities",
      name: "Customer Factories",
      component: CustomerFactories,
    },
    {
      path: "/dashboard/customers/:id/locations",
      name: "Customer Locations",
      component: CustomerLocations,
    },
    {
      path: "/dsahboard/customers/:id/equipment",
      name: "Customer Equipment",
      component: CustomerEquipment,
    },
    {
      path: "/dashboard/facilities/:id/equipment",
      name: "Factory Equipment",
      component: FactoryEquipment,
    },
    {
      path: "/dashboard/facilities/:id/locations",
      name: "Factory Locations",
      component: FactoryLocations,
    },
    {
      path: "/dashboard/facilities/:id",
      name: "Factory",
      component: Factory,
    },
    {
      path: "/dashboard/locations/:id/equipment",
      name: "Location Equipment",
      component: LocationEquipment,
    },
    {
      path: "/dashboard/locations/:id",
      name: "Location",
      component: Location,
    },
    {
      path: "/dashboard/equipment/:id",
      name: "Equipment",
      component: Equipment,
    },
  ],
};

export default routes;
