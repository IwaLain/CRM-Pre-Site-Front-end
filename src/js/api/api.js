export const api = async (configs) => {
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