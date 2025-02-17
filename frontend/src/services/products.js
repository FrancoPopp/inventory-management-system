const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const fetchProducts = async () => {
  return fetch(`${url}/products`, {
    headers: {
      "Content-Type": "application/json",
      WithCredentials: true,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  });
};

export const fetchProduct = async (id) => {
  return fetch(`${url}/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
      WithCredentials: true,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  });
};

export const addProduct = async (product) => {
  return fetch(`${url}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(product),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to add product");
    res.json();
  });
};

export const deleteProduct = async (id) => {
  return fetch(`${url}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
