export const api = async (configs) => {
    const path = `${configs.url + configs.path + configs.token}`
    const response = await fetch(path, {
        method: configs.method
    })
    return await response.json()
}