import CustomerPage from "./views/CustomerPage";
import ProfilePage from "./views/ProfilePage";
import LoginPage from "./views/LoginPage";
import UsersPage from "./views/UsersPage";
import AddUserPage from "./views/AddUserPage";
import CreateCustomer from "./views/CreateCustomer";
import CustomerFactoryPage from "./views/CustomerFactoryPage";
import CustomersPage from "./components/pages/CustomersPage/CustomersPage";
import FacilitiesPage from "./components/pages/FacilitiesPage/FacilitiesPage";
import EquipmentPage from "./components/pages/EquipmentPage/EquipmentPage";

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
      path: "/dashboard/customer",
      name: "Customer Page",
      component: CustomerPage,
    },
    {
      path: "/dashboard/profile",
      name: "Profile Page",
      component: ProfilePage,
    },
    {
      path: "/dashboard/users",
      name: "Users Page",
      component: UsersPage,
    },
    {
      path: "/dashboard/add-user",
      name: "Add User",
      component: AddUserPage,
    },
    {
      path: "/dashboard/create-customer",
      name: "Customer Create",
      component: CreateCustomer,
    },
    {
      path: "/dashboard/customers",
      name: "Customers",
      component: CustomersPage,
    },
    {
      path: "/dashboard/customer-factory",
      name: "Customer Page Factory",
      component: CustomerFactoryPage,
    },
    {
      path: "/dashboard/facilities",
      name: "Facilities",
      component: FacilitiesPage,
    },
    {
      path: "/dashboard/equipment",
      name: "equipment",
      component: EquipmentPage,
    },
  ],
};

export default routes;
