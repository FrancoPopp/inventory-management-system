const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const fetchCategories = async () => {
  return fetch(`${url}/categories`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  });
};

export const addCategory = async (category) => {
  return fetch(`${url}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(category),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to add category");
    res.json();
  });
};

export const deleteCategory = async (id) => {
  return fetch(`${url}/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
