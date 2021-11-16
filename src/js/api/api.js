const api = async (configs) => {
    const token = 'RpmMkezH3ZwSJd_cECci8gyyqzNfVw8QvkR6yvOfWHUEeRtKEdoZrwPB_VQkFGfP'
    const baseURL = 'http://crm.local'
    if (configs.method === 'GET') {
        const path = `${baseURL + configs.url + token}`
        const response = await fetch(path, {
            method: configs.method
        })
        return await response.json()   
    } else if (configs.method === 'POST') {
        const path = `${baseURL + configs.url}`
        const response = await fetch(path, {
            method: configs.method,
            body: configs.data
        })
        return await response.json()
    }
}

export const loginAPI = async (data) => {
    let config = {
        method: 'POST',
        url: '/api/login',
        data: JSON.stringify(data)
    }
    const response = await api(config)
    console.log(response)
    return response
}

export const getUsersAPI = async () => {
    let config = {
        method: 'GET',
        url: '/api/customer?access-token='
    }

    const response = await api(config)
    return response.customers
}

export const getProfileAPI = async (userId) => {
    let config = {
        method: 'GET',
        url: `/api/customer/:${userId}?access-token=`
    }

    const response = await api(config)
    return response
}

export const getEquipmentAPI = async () => {
    let config = {
        method: 'GET',
        url: '/api/equipment?access-token='
    }

    const response = await api(config)
    return response.equipment
}


