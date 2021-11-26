const baseURL = 'http://crm.local'

export const apiRequest = async ( method, url, callback, data = {}, headers = undefined) => {
    fetch({
        method: method,
        url: url,
        params: (method === 'get' || method === 'GET') ? data : null,
        data: data,
        headers: headers
    })
      .then(response => {
        callback( response.data, response.status)
      })
      .catch(error => {
          if(error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
              callback( null, error.response.data, error.response.status)
          } else if (error.request) {
              console.log(error.request)
              callback( null, null, 500 )
          } else {
              console.error(error)
              callback( null, 'Unexpected error')
          }
      })
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