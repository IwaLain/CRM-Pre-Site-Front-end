const token = localStorage.getItem('token')

export const endpoints = {
    login: `/api/login`,
    logout: `/api/logout/`,
    getUsers: `/api/user?access-token=${token}`,
    addUser: `/api/user/create?access-token=${token}`,
    editeUser: `/api/user/update/`,
    getEquipment: `/api/equipment?access-token=${token}`,
    getCustomers: `/api/customer?access-token=${token}`,
    addCustomer: `/api/customer/create?access-token=${token}`,
}
