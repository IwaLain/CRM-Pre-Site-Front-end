const baseURL = 'http://crm.local'
let response = []

export const api = async (configs) => {
    const token = localStorage.getItem('token')
    if (configs.method === 'GET') {
        const path = `${baseURL + configs.url + token}`
        
        response = await fetch(path, {
            method: configs.method
        }) 
    } else if (configs.method === 'POST') {
        const path = `${baseURL + configs.url + token}`

        response = await fetch(path, {
            method: configs.method,
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(configs.data)
        })
    }

    return await response.json()
}

export const login = async (configs) => {
    const path = `${baseURL + configs.url}`

    response = await fetch(path, {
        method: configs.method,
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(configs.data)
    })

    return await response.json()
}