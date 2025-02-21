import { useState, useEffect } from "react";
import { useVariants } from "../hooks/useVariants";
import { useColors } from "../hooks/useColors";
import { useProducts } from "../hooks/useProducts";
import { useSales } from "../hooks/useSales";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Label } from "./Label";
import { Select, SelectItem } from "./Select";
import { Input } from "./Input";
import { Button } from "./Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "./Table";
import { useNavigate } from "react-router-dom";
import { LuInfo } from "react-icons/lu";

function AddSale() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [newSale, setNewSale] = useState({
    paymentMethod: 0,
    totalAmount: 0,
    saleDetails: [],
  });
  const [newSaleDetail, setNewSaleDetail] = useState({
    productVariantId: "",
    quantity: 1,
    priceAtSale: 0,
  });

  const [validQuantity, setValidQuantity] = useState(false);

  const { variants, getVariant } = useVariants(selectedProduct);
  const { getColorName } = useColors();
  const { products } = useProducts();
  const { addSale } = useSales();

  const [variantDetails, setVariantDetails] = useState({});

  useEffect(() => {
    setValidQuantity(
      variants?.find((variant) => variant.id === newSaleDetail.productVariantId)
        ?.stockLevel >= newSaleDetail.quantity,
    );
  }, [newSaleDetail, variants]);

  useEffect(() => {
    const fetchVariantDetails = async () => {
      const details = {};
      for (const detail of newSale.saleDetails) {
        if (!variantDetails[detail.productVariantId]) {
          const variant = await getVariant(detail.productVariantId);
          details[detail.productVariantId] = variant;
        }
      }
      setVariantDetails({ ...variantDetails, ...details });
    };

    if (newSale.saleDetails.length > 0) {
      fetchVariantDetails();
    }
  }, [newSale.saleDetails]);

  const handleAddToSale = (e) => {
    e.preventDefault();

    const product = products.find((product) => product.id === selectedProduct);

    setNewSale({
      ...newSale,
      totalAmount: newSale.totalAmount + product.price * newSaleDetail.quantity,
      saleDetails: [
        ...newSale.saleDetails,
        { ...newSaleDetail, priceAtSale: product.price },
      ],
    });

    setSelectedProduct("");
    setNewSaleDetail({ productVariantId: "", quantity: 1, priceAtSale: 0 });

    e.target.reset();
  };

  const handleSaleSubmit = (e) => {
    e.preventDefault();

    addSale({ ...newSale });

    setNewSale({
      paymentMethod: 0,
      totalAmount: 0,
      saleDetails: [],
    });
    setVariantDetails({});
    navigate("/sales");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="h-fit lg:col-span-1">
        <CardHeader>
          <CardTitle>Agregar productos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddToSale} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product">Producto</Label>
              <Select
                id="product"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <SelectItem value="" disabled>
                  Selecciona un producto
                </SelectItem>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - ${product.price.toFixed(2)}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="variant">Modelo</Label>
              <Select
                id="variant"
                value={newSaleDetail.productVariantId}
                onChange={(e) =>
                  setNewSaleDetail({
                    ...newSaleDetail,
                    productVariantId: e.target.value,
                  })
                }
              >
                <SelectItem value="" disabled>
                  Selecciona un modelo
                </SelectItem>
                {variants?.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    {`talle: ${variant.size} - color: ${getColorName(variant.colorId)} - ${variant.stockLevel} unidades`}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={newSaleDetail.quantity}
                className={`${!validQuantity ? "border-2 border-red-500" : ""}`}
                onChange={(e) =>
                  setNewSaleDetail({
                    ...newSaleDetail,
                    quantity: Number.parseInt(e.target.value),
                  })
                }
              />
              {!validQuantity && (
                <p className="relative flex items-center gap-2 rounded-lg bg-gray-300 p-1 text-xs text-gray-900">
                  <LuInfo className="h-4 w-4" />
                  No hay suficiente stock
                </p>
              )}
            </div>
            <Button
              disabled={!validQuantity || !newSaleDetail.productVariantId}
              className="h-10 bg-[#171717] px-4 py-2 text-[#fafafa] hover:bg-[#171717]/90"
              type="submit"
            >
              Agregar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-nowrap">
              Total: ${newSale.totalAmount}
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Table className="h-[350px]">
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
                {newSale.saleDetails.map((detail) => (
                  <TableRow
                    className="hover:bg-[#e3e3e3]"
                    key={
                      detail.productVariantId +
                      detail.quantity +
                      detail.priceAtSale
                    }
                  >
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
                    <TableCell>${detail.priceAtSale.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between">
              <div className="w-1/2">
                <Select
                  id="paymentMethod"
                  value={newSale.paymentMethod}
                  onChange={(e) =>
                    setNewSale({
                      ...newSale,
                      paymentMethod: Number.parseInt(e.target.value),
                    })
                  }
                >
                  <SelectItem value="" disabled>
                    Selecciona un método de pago
                  </SelectItem>
                  <SelectItem value="0">Crédito</SelectItem>
                  <SelectItem value="1">Débito</SelectItem>
                  <SelectItem value="2">Efectivo</SelectItem>
                </Select>
              </div>
              <Button
                className="h-10 bg-[#419933] px-4 py-2 text-[#fafafa] hover:bg-[#417933]"
                onClick={handleSaleSubmit}
              >
                Finalizar venta
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddSale;
