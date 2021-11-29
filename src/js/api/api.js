const baseURL = 'http://crm.local'
let response = [];

export const apiRequest = async ( method, url, data = '', headers = undefined) => {
    if (method === 'GET' || method === 'DELETE') {
        const response = await fetch(url, {
            method: method,
            headers: headers,
        })
        return await response.json()
    } else {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(data),
        })
        return await response.json()
    }
}

export const api = async (configs) => {
    const path = `${baseURL + configs.url}`
    
    switch (configs.method) {
        case 'GET':
        case 'DELETE':
            response = await fetch(path, {
                method: configs.method
            }) 
            break
        case 'PUT':
        case 'POST':
            response = await fetch(path, {
                method: configs.method,
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(configs.data)
            })  
            break
        default:
            break
    }

    return await response.json()
}

export const Global = async (method, url, data = '') => {
    const config = {
        method,
        url,
        data
    }

    const response = await api(config)
    return response
}