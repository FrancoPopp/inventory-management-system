import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export const useAuth = () => {
  const { token, setToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = Boolean(token);

  const url = `${import.meta.env.VITE_API_URL}/api/v0/auth`;

  const login = async ({ username, password }) => {
    setIsLoading(true);
    await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        WithCredentials: true,
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) throw new Error("Falta usuario o contraseña");
          if (res.status === 401)
            throw new Error("Nombre o contraseña incorrecta");
          throw new Error("Error al iniciar sesión");
        }
        return res.json();
      })
      .then(({ token }) => {
        setToken(token);
        localStorage.setItem("token", token);
      })
      .catch((error) => {
        throw new Error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return {
    token,
    login,
    logout,
    isAuthenticated,
    isLoginLoading: isLoading,
  };
};
