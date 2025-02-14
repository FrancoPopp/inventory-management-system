import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Inventory from "./components/Inventory";
import Variants from "./components/Variants";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<h1>Dashboard</h1>} />
        <Route path="inventory">
          <Route index element={<Inventory />} />
          <Route path=":id" element={<Variants />} />
        </Route>
        <Route path="sales" element={<h1>Sales</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
