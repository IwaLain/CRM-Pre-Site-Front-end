import CustomerPage from "./components/pages/CustomerPage/CustomerPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import UsersPage from "./components/pages/UsersPage/UsersPage";
import AddUserPage from "./components/pages/UsersPage/AddUserPage/AddUserPage";
import CreateCustomer from "./components/pages/CreateCustomerPage/CreateCustomer";
import CustomerFactoryPage from "./components/pages/CustomerFactoryPage/CustomerFactoryPage";
import CustomersPage from "./components/pages/CustomersPage/CustomersPage";
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
      path: "/dashboard/customers/:id",
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
      path: "/dashboard/facilities/:id",
      name: "Customer Factory",
      component: CustomerFactoryPage,
    },
    {
      path: "/dashboard/equipment/:id",
      name: "Location Equipment",
      component: EquipmentPage,
    },
  ],
};

export default routes;
