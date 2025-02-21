const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const fetchVariants = async (productId) => {
  if (!productId) return [];
  return fetch(`${url}/products/${productId}/variants`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch variants");
    return res.json();
  });
};

export const addVariant = async (variant) => {
  return fetch(`${url}/products/${variant.productId}/variants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(variant),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to add variant");
    res.json();
  });
};

export const deleteVariant = async (id) => {
  return fetch(`${url}/products/variants/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const addStock = async (id) => {
  return fetch(`${url}/products/variants/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const fetchVariant = async (id) => {
  return fetch(`${url}/products/variants/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch variant");
    return res.json();
  });
};
