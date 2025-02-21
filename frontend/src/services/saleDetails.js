const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const fetchSaleDetails = async (saleId) => {
  return fetch(`${url}/sales/${saleId}/details`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch sales");
      return res.json();
    })
    .then((data) => {
      console.log("saleId ", saleId);
      console.log("data ", data);
      return data;
    });
};
