import { useState } from "react";
import { LuArrowLeft, LuPlus } from "react-icons/lu";
import { Button } from "./Button";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function Sales() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isAddingSale, setIsAddingSale] = useState(false);

  const handleChangeRoute = () => {
    if (isAddingSale) {
      setIsAddingSale(false);
      navigate("/sales");
    } else {
      setIsAddingSale(true);
      navigate("/sales/add-sale");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Ventas</h1>
        {pathname === "/sales" ? (
          <Button
            className="h-10 bg-[#171717] px-4 py-2 text-[#fafafa] hover:bg-[#171717]/90"
            onClick={() => navigate("/sales/add-sale")}
          >
            <LuPlus className="mr-2 h-4 w-4" />
            Agregar venta
          </Button>
        ) : (
          <Button
            className="h-10 bg-[#171717] px-4 py-2 text-[#fafafa] hover:bg-[#171717]/90"
            onClick={() => navigate("/sales")}
          >
            <LuArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Sales;
