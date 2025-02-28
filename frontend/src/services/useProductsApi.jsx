import { useFetchData } from "./useFetchData";

const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const useProductsApi = () => {
  const { fetchData } = useFetchData();

  const fetchProducts = async () => {
    console.log("fetching products");
    return fetchData(`${url}/products`, {
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

  const fetchProduct = async (id) => {
    return fetchData(`${url}/products/${id}`, {
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

  const addProduct = async (product) => {
    return fetchData(`${url}/products`, {
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

  const deleteProduct = async (id) => {
    return fetchData(`${url}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  return { fetchProducts, fetchProduct, addProduct, deleteProduct };
};
