import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Inventory from "./components/Inventory";
import Variants from "./components/Variants";
import Dashboard from "./components/Dashboard";
import Sales from "./components/Sales";
import Details from "./components/Details";
import SalesHistory from "./components/SalesHistory";
import AddSale from "./components/AddSale";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/:id" element={<Variants />} />

          <Route path="sales" element={<Sales />}>
            <Route index element={<SalesHistory />} />
            <Route path="add-sale" element={<AddSale />} />
          </Route>
          <Route path="sales/:id" element={<Details />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
