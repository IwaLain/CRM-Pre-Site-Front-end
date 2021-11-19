import { api } from "./api"

const getProfileAPI = async (userId) => {
    let config = {
        method: 'GET',
        url: `/api/customer/:${userId}?access-token=`
    }

    const response = await api(config)
    return response
}

export const profile = {
    getProfileAPI
}