export const apiRequest = async (
  method,
  url,
  data = {},
  headers = undefined
) => {
  if (method === "GET" || method === "DELETE") {
    try {
      const response = await fetch(url, {
        method: method,
      });
      const json = await response.json();
      return await json;
    } catch (error) {
      console.error("Error: ", error);
    }
  } else {
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
      });

      const json = await response.json();

      return await json;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
};
