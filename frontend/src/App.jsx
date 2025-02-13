import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<h1>Dashboard</h1>} />
        <Route path="inventory" element={<h1>Inventory</h1>} />
        <Route path="sales" element={<h1>Sales</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
