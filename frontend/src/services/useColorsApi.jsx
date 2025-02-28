import { useFetchData } from "./useFetchData";

const url = `${import.meta.env.VITE_API_URL}/api/v0`;

export const useColorsApi = () => {
  const { fetchData } = useFetchData();

  const fetchColors = async () => {
    return fetchData(`${url}/colors`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch colors");
      return res.json();
    });
  };

  const addColor = async (color) => {
    return fetchData(`${url}/colors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(color),
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to add color");
      return res.json();
    });
  };

  const deleteColor = async (id) => {
    return fetchData(`${url}/colors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  return { fetchColors, addColor, deleteColor };
};
