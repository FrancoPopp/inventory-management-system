import { useFetchData } from "./useFetchData";

const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const useVariantsApi = () => {
  const { fetchData } = useFetchData();

  const fetchVariants = async (productId) => {
    if (!productId) return [];
    return fetchData(`${url}/products/${productId}/variants`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch variants");
      return res.json();
    });
  };

  const addVariant = async (variant) => {
    return fetchData(`${url}/products/${variant.productId}/variants`, {
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

  const deleteVariant = async (id) => {
    return fetchData(`${url}/products/variants/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const addStock = async (id) => {
    return fetchData(`${url}/products/variants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const fetchVariant = async (id) => {
    return fetchData(`${url}/products/variants/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch variant");
      return res.json();
    });
  };

  return { fetchVariants, fetchVariant, addVariant, deleteVariant, addStock };
};
