import CustomerPage from "./views/CustomerPage";
import ProfilePage from "./views/ProfilePage";
import LoginPage from "./views/LoginPage";
import UsersPage from "./views/UsersPage";
import AddUserPage from "./views/AddUserPage";
import CreateCustomer from "./views/CreateCustomer";
import CustomersPage from "./views/CustomersPage";

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
      }
  ],
};

export default routes;
