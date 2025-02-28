import { useFetchData } from "./useFetchData";

const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const useSaleDetailsApi = () => {
  const { fetchData } = useFetchData();

  const fetchSaleDetails = async (saleId) => {
    return fetchData(`${url}/sales/${saleId}/details`, {
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

  return { fetchSaleDetails };
};
