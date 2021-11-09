import CustomerPage from "./views/CustomerPage";
import ProfilePage from "./views/ProfilePage";
import LoginPage from "./views/LoginPage";

const routes = {
    auth: [
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        }
    ],
    dashboard: [
        {
            path: '/dashboard/customer-page',
            name: 'Customer Page',
            component: CustomerPage
        },
        {
            path: '/dashboard/profile-page',
            name: 'Profile Page',
            component: ProfilePage
        }
    ]
}

export default routes