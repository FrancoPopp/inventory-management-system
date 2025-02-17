const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const fetchColors = async () => {
  return fetch(`${url}/colors`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch colors");
    return res.json();
  });
};

export const addColor = async (color) => {
  return fetch(`${url}/colors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(color),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to add color");
    return res.json();
  });
};

export const deleteColor = async (id) => {
  return fetch(`${url}/colors/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
