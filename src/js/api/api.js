const baseURL = "http://crm.loc";
let response = [];

export const api = async (configs) => {
  const path = `${baseURL + configs.url}`;
  switch (configs.method) {
    case "GET":
    case "DELETE":
      response = await fetch(path, {
        method: configs.method,
      });
      break;
    case "POST":
      response = await fetch(path, {
        method: configs.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configs.data),
      });
      break;
    case "PUT":
      break;
    default:
      break;
  }

  return await response.json();
};
