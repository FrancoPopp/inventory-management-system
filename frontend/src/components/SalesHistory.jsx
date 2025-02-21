import { useNavigate } from "react-router-dom";
import { useSales } from "../hooks/useSales";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
} from "./Table";
import { Button } from "./Button";
import { LuTrash2 } from "react-icons/lu";

function SalesHistory() {
  const navigate = useNavigate();

  const { sales, isLoading, isError, deleteSale } = useSales();

  const handleDeleteSale = (id) => {
    deleteSale(id);
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Historial de ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading && <div>Cargando...</div>}
            {isError && <div>Error al cargar las ventas</div>}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Método de pago</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow
                    onClick={() => {
                      navigate(`${sale.id}`);
                    }}
                    className="cursor-pointer hover:bg-[#e3e3e3]"
                    key={sale.id}
                  >
                    <TableCell>{`${sale.saleDate[2]}/${sale.saleDate[1]}/${sale.saleDate[0]}`}</TableCell>
                    <TableCell>{sale.paymentMethod}</TableCell>
                    <TableCell>${Number.parseInt(sale.totalAmount)}</TableCell>
                    <TableCell>
                      <Button
                        className="group h-10 min-w-1/2 text-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSale(sale.id);
                        }}
                      >
                        <LuTrash2
                          color="#d65850"
                          className="h-6 w-6 transition-all duration-200 group-hover:scale-150"
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SalesHistory;
