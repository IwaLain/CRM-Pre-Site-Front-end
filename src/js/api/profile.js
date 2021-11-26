import { Global } from "./api" 
const token = localStorage.getItem('token')

const getProfile = async () => {
    return Global('GET', `/api/user/profile?access-token=${token}`)
}

export const profile = {
    getProfile,
}