import CustomerPage from "./components/pages/CustomerPage/CustomerPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import UsersPage from "./components/pages/UsersPage/UsersPage";
import AddUserPage from "./components/pages/UsersPage/AddUserPage/AddUserPage";
import CustomerCreatePage from "./components/pages/CustomerCreatePage/CustomerCreatePage";
import CustomerFactoryPage from "./components/pages/CustomerFactoryPage/CustomerFactoryPage";
import CustomersPage from "./components/pages/CustomersPage/CustomersPage";
import EquipmentPage from "./components/pages/EquipmentPage/EquipmentPage";
import CRMEntity from "./components/CRMEntity/CRMEntity";

const routes = {
  auth: [
    {
      path: "/login",
      name: "Login",
      component: <LoginPage />,
    },
  ],
  dashboard: [
    {
      path: "/dashboard/customers/:id",
      name: "Customer Page",
      children: <CRMEntity type={{ entity: "customer" }} />,
    },
    {
      path: "/dashboard/profile",
      name: "Profile Page",
      children: <ProfilePage />,
    },
    {
      path: "/dashboard/users",
      name: "Users Page",
      children: <UsersPage />,
    },
    {
      path: "/dashboard/add-user",
      name: "Add User",
      children: <AddUserPage />,
    },
    {
      path: "/dashboard/customer-create",
      name: "Customer Create",
      children: <CustomerCreatePage />,
    },
    {
      path: "/dashboard/customers",
      name: "Customers",
      children: <CustomersPage />,
    },
    {
      path: "/dashboard/facilities/:id",
      name: "Customer Factory",
      children: <CRMEntity type={{ entity: "facility" }} />,
    },
    {
      path: "/dashboard/equipment/:id",
      name: "Location Equipment",
      children: <EquipmentPage />,
    },
    {
      path: "/dashboard/locations/:id",
      name: "Factory Location",
      children: <CRMEntity type={{ entity: "location" }} />,
    },
  ],
};

export default routes;
