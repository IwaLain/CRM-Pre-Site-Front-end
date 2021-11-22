import CustomerPage from "./components/pages/CustomerPage/CustomerPage";
import ProfilePage from "./views/ProfilePage";
import LoginPage from "./views/LoginPage";
import UsersPage from "./views/UsersPage";
import AddUserPage from "./views/AddUserPage";
import CustomerCreatePage from "./components/pages/CustomerCreatePage/CustomerCreatePage";
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
      path: "/dashboard/customer-create",
      name: "Customer Create",
      component: CustomerCreatePage,
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
