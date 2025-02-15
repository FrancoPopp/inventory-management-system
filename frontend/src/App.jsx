import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Inventory from "./components/Inventory";
import Variants from "./components/Variants";
import Dashboard from "./components/Dashboard";
import Sales from "./components/Sales";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventory">
          <Route index element={<Inventory />} />
          <Route path=":id" element={<Variants />} />
        </Route>
        <Route path="sales" element={<Sales />} />
      </Route>
    </Routes>
  );
}

export default App;
