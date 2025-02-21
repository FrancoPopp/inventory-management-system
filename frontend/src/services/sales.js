const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const fetchSales = async () => {
  return fetch(`${url}/sales`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch sales");
    return res.json();
  });
};

export const fetchSale = async (id) => {
  return fetch(`${url}/sales/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch sales");
    return res.json();
  });
};

export const addSale = async (sale) => {
  return fetch(`${url}/sales`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(sale),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to add sale");
    res.json();
  });
};

export const deleteSale = async (id) => {
  return fetch(`${url}/sales/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
