import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { login, isLoginLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ username, password });
    } catch (error) {
      setErrorMsg(error.message);
    }

    setUsername("");
    setPassword("");

    e.target.reset();
  };

  if (isAuthenticated)
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <p
          className={`${errorMsg ? "mb-4 rounded-lg bg-pink-100 px-4 py-2 font-semibold text-red-700" : "absolute -left-full"}`}
        >
          {errorMsg}
        </p>
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setErrorMsg("")}
              required
              value={username}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setErrorMsg("")}
              required
              autoComplete="off"
              value={password}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              disabled={username === "" || password === "" || isLoginLoading}
              className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-indigo-600"
            >
              {isLoginLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
