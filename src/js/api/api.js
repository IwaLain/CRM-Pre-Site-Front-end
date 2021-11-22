const baseURL = 'http://crm.local'
let response = []

export const api = async (configs) => {
    const path = `${baseURL + configs.url}`

    switch (configs.method) {
        case 'GET':
        case 'DELETE':
            response = await fetch(path, {
                method: configs.method
            }) 
            break
        case 'POST':
        case 'PUT':
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