import { useAuth } from "../hooks/useAuth";

export const useFetchData = () => {
  const { logout } = useAuth();
  const fetchData = async (input, init) => {
    return fetch(input, init).then((res) => {
      if (res.status === 401) {
        console.log("JWT EXPIRED");
        logout();
      }
      return res;
    });
  };

  return { fetchData };
};
