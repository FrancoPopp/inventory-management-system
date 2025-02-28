import { useFetchData } from "./useFetchData";

const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const useSalesApi = () => {
  const { fetchData } = useFetchData();

  const fetchSales = async () => {
    return fetchData(`${url}/sales`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch sales");
      return res.json();
    });
  };

  const fetchSale = async (id) => {
    return fetchData(`${url}/sales/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch sales");
      return res.json();
    });
  };

  const addSale = async (sale) => {
    return fetchData(`${url}/sales`, {
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

  const deleteSale = async (id) => {
    return fetchData(`${url}/sales/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  return { fetchSales, fetchSale, addSale, deleteSale };
};
