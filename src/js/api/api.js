export const apiRequest = async (
  method,
  url,
  data = {},
  headers = undefined
) => {
  if (method === "GET" || method === "DELETE") {
      const response = await fetch(url, {
        method: method,
      }).then(data => {
        return data.json();
      }).catch(errors => {
        console.log('Error: ' + errors)
      });
      return response
  } 
  else {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    }).then(data => {
      return data.json();
    }).catch(errors => {
      console.log('Error: ' + errors)
    });
    return response
  }
};
