import { useFetchData } from "./useFetchData";

const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const useCategoriesApi = () => {
  const { fetchData } = useFetchData();
  const fetchCategories = async () => {
    return fetchData(`${url}/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    });
  };

  const addCategory = async (category) => {
    return fetchData(`${url}/categories`, {
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

  const deleteCategory = async (id) => {
    return fetchData(`${url}/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  return { fetchCategories, addCategory, deleteCategory };
};
