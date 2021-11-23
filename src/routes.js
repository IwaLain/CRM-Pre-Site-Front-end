import CustomerPage from "./components/pages/CustomerPage/CustomerPage";
import Profile from "./components/pages/Profile/Profile";
import Login from "./components/pages/Login/Login";
import Users from "./components/pages/Users/Users";
import AddUser from "./components/pages/Users/AddUser/AddUser";
import CustomerCreatePage from "./components/pages/CustomerCreatePage/CustomerCreatePage";
import CustomerFactoryPage from "./components/pages/CustomerFactoryPage/CustomerFactoryPage";
import CustomersPage from "./components/pages/CustomersPage/CustomersPage";
import EquipmentPage from "./components/pages/EquipmentPage/EquipmentPage";

const routes = {
  auth: [
    {
      path: "/login",
      name: "Login",
      component: Login,
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
      name: "Profile",
      component: Profile,
    },
    {
      path: "/dashboard/users",
      name: "Users",
      component: Users,
    },
    {
      path: "/dashboard/add-user",
      name: "Add User",
      component: AddUser,
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
