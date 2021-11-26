const baseURL = "http://crm.local";
let response = [];

const log = async (configs) => {
  const path = `${baseURL + configs.url}`;

  response = await fetch(path, {
    method: configs.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(configs.data),
  });

  return await response.json();
};

export const login = async (data) => {
  let config = {
    method: "POST",
    url: `/api/login`,
    data: data,
  };

  const response = await log(config);
  return response;
};

export const logout = async () => {
  const path = `${
    baseURL + `/api/logout` + "?access-token=" + localStorage.getItem("token")
  }`;

  response = await fetch(path, {
    method: "POST",
  });

  return await response.json();
};
