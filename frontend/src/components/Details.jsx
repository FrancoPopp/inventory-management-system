import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Table";
import { Button } from "./Button";
import { LuArrowLeft } from "react-icons/lu";
import { useProducts } from "../hooks/useProducts";
import { useVariants } from "../hooks/useVariants";
import { useColors } from "../hooks/useColors";
import { useSales } from "../hooks/useSales";
import { useSaleDetails } from "../hooks/useSaleDetails";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getVariant } = useVariants(id);
  const { getSale } = useSales();
  const { products } = useProducts();
  const { saleDetails, isLoading, isError } = useSaleDetails(id);
  const { getColorName } = useColors();
  const [sale, setSale] = useState(null);
  const [variantDetails, setVariantDetails] = useState({});

  useEffect(() => {
    getSale(id).then((sale) => {
      setSale(sale);
    });
  }, [id]);

  useEffect(() => {
    console.log(saleDetails);

    const fetchVariantDetails = async () => {
      const details = {};
      for (const detail of saleDetails) {
        if (!details[detail.productVariantId]) {
          const variant = await getVariant(detail.productVariantId);
          details[detail.productVariantId] = variant;
        }
      }
      setVariantDetails({ ...variantDetails, ...details });
    };

    if (saleDetails.length > 0) {
      fetchVariantDetails();
    }
  }, [saleDetails]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="flex w-1/2 flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button
            className="h-10 bg-[#171717] px-4 py-2 text-[#fafafa] hover:bg-[#171717]/90"
            onClick={() => navigate(-1)}
          >
            <LuArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Detalles de la venta</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Fecha: </strong>
              {sale?.saleDate?.slice(0, 3).reverse().join("/") ?? "Cargando..."}
            </p>
            <p>
              <strong>Método de pago: </strong>
              {sale?.paymentMethod ?? "Cargando..."}
            </p>
            <p>
              <strong>Total: </strong> ${sale?.totalAmount ?? "Cargando..."}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Items vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <div>Cargando...</div>}
            {isError && <div>Error al cargar los detalles de la venta</div>}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Talle</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {saleDetails?.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell>
                        {products.find(
                          (product) =>
                            product.id ===
                            variantDetails[detail.productVariantId]?.productId,
                        )?.name || "Loading..."}
                      </TableCell>
                      <TableCell>
                        {variantDetails[detail.productVariantId]?.size ||
                          "Loading..."}
                      </TableCell>
                      <TableCell>
                        {getColorName(
                          variantDetails[detail.productVariantId]?.colorId,
                        ) || "Loading..."}
                      </TableCell>
                      <TableCell>{detail.quantity}</TableCell>
                      <TableCell>{detail.priceAtSale}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Details;
