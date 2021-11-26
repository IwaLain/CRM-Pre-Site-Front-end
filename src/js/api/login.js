const baseURL = 'http://crm.local'
let response = []
const token = localStorage.getItem('token')

const log = async (configs) => {
    const path = `${baseURL + configs.url}`

  response = await fetch(path, {
    method: configs.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(configs.data),
  });

  return await response.json();
};

export const login = async (data) => {
    let config = {
        method: 'POST',
        url: `/api/login`,
        data: data
    }

    const response = await log(config)
    return response
}

export const logout = async (userId) => {
    const path = `${baseURL + `/api/logout/` + userId + '?access-token=' + token}`

    response = await fetch(path, {
        method: 'POST',
    })

    return await response.json()
    
}
