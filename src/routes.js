import CustomerPage from "./views/CustomerPage";
import Profile from "./components/pages/Profile/Profile";
import Login from "./components/pages/Login/Login";
import Users from "./components/pages/Users/Users";
import AddUser from "./components/pages/Users/AddUser/AddUser";
import CreateCustomer from "./views/CreateCustomer";
import CustomersPage from "./views/CustomersPage";
import CustomerFactoryPage from "./views/CustomerFactoryPage";

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
      path: "/dashboard/customer",
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
  ],
};

export default routes;
