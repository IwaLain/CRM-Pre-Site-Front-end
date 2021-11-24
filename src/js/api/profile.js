import { Global } from "./api" 
const token = localStorage.getItem('token')

const getProfile = async (userId) => {
    return Global('GET', `/api/customer/:${userId}?access-token=${token}`)
}

export const profile = {
    getProfile,
}