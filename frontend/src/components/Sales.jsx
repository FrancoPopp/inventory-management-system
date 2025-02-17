import { useState } from "react";
import { LuArrowLeft, LuPlus } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";
import { Select, SelectItem } from "./Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const products = [
  { id: 1, name: "T-Shirt", category: "Top", price: 19.99 },
  { id: 2, name: "Jeans", category: "Bottom", price: 49.99 },
  { id: 3, name: "Sneakers", category: "Shoes", price: 79.99 },
];

const variants = [
  { id: 1, color: "Red", size: "S", stock: 10 },
  { id: 2, color: "Black", size: "M", stock: 15 },
  { id: 3, color: "Blue", size: "L", stock: 8 },
  { id: 4, color: "White", size: "XL", stock: 12 },
];

const initialSalesHistory = [
  { id: 1, date: "2023-05-01", method: "Cash", total: 1999.98 },
  { id: 2, date: "2023-05-02", method: "Credit", total: 1799.97 },
  { id: 3, date: "2023-05-03", method: "Debit", total: 749.95 },
  { id: 4, date: "2023-05-04", method: "Cash", total: 299.99 },
  { id: 5, date: "2023-05-05", method: "Credit", total: 399.98 },
  { id: 6, date: "2023-05-01", method: "Cash", total: 1999.98 },
  { id: 7, date: "2023-05-02", method: "Credit", total: 1799.97 },
  { id: 8, date: "2023-05-03", method: "Debit", total: 749.95 },
  { id: 9, date: "2023-05-04", method: "Cash", total: 299.99 },
  { id: 10, date: "2023-05-05", method: "Credit", total: 399.98 },
];

function Sales() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [salesHistory, setSalesHistory] = useState(initialSalesHistory);
  const [filterDate, setFilterDate] = useState("");
  const [isAddingSale, setIsAddingSale] = useState(false);
  const [saleDetails, setSaleDetails] = useState([]);

  const handleAddToSale = (e) => {
    e.preventDefault();

    const product = products.find(
      (product) => product.id === Number.parseInt(selectedProduct),
    );
    const variant = variants.find(
      (variant) => variant.id === Number.parseInt(selectedVariant),
    );

    const newSaleDetail = {
      id: saleDetails.length + 1,
      product: product.name,
      size: variant.size,
      color: variant.color,
      quantity: quantity,
      price: product.price,
    };

    setSaleDetails([...saleDetails, newSaleDetail]);
    setSelectedProduct("");
    setSelectedVariant("");
    setQuantity(1);

    e.target.reset();
  };

  const handleSaleSubmit = (e) => {
    e.preventDefault();
    const product = products.find(
      (p) => p.id === Number.parseInt(selectedProduct),
    );
    if (product) {
      const newSale = {
        id: salesHistory.length + 1,
        date: new Date().toISOString().split("T")[0],
        product: product.name,
        quantity: quantity,
        total: product.price * quantity,
      };
      setSalesHistory([newSale, ...salesHistory]);
      setSelectedProduct("");
      setQuantity(1);
    }
  };

  const filteredSales = filterDate
    ? salesHistory.filter((sale) => sale.date === filterDate)
    : salesHistory;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Ventas</h1>
        <Button
          className="h-10 bg-[#171717] px-4 py-2 text-[#fafafa] hover:bg-[#171717]/90"
          onClick={() => setIsAddingSale(!isAddingSale)}
        >
          {isAddingSale ? (
            <>
              <LuArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </>
          ) : (
            <>
              <LuPlus className="mr-2 h-4 w-4" />
              Agregar venta
            </>
          )}
        </Button>
      </div>
      {isAddingSale ? (
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
                      <SelectItem
                        key={product.id}
                        value={product.id.toString()}
                      >
                        {product.name} - ${product.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variant">Modelo</Label>
                  <Select
                    id="variant"
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                  >
                    <SelectItem value="" disabled>
                      Selecciona un modelo
                    </SelectItem>
                    {variants.map((variant) => (
                      <SelectItem
                        key={variant.id}
                        value={variant.id.toString()}
                      >
                        {`${variant.size} - ${variant.color} - ${variant.stock} unidades`}
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
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Number.parseInt(e.target.value))
                    }
                  />
                </div>
                <Button
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
              <CardTitle>
                Total: $
                {saleDetails
                  .reduce(
                    (acc, detail) => acc + detail.price * detail.quantity,
                    0,
                  )
                  .toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                  {saleDetails.map((detail) => (
                    <TableRow className="hover:bg-[#e3e3e3]" key={detail.id}>
                      <TableCell>{detail.product}</TableCell>
                      <TableCell>{detail.size}</TableCell>
                      <TableCell>{detail.color}</TableCell>
                      <TableCell>{detail.quantity}</TableCell>
                      <TableCell>${detail.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Sales History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="filterDate">Filter by Date</Label>
                  <Input
                    id="filterDate"
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSales.map((sale) => (
                      <TableRow className="hover:bg-[#e3e3e3]" key={sale.id}>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>{sale.product}</TableCell>
                        <TableCell>{sale.quantity}</TableCell>
                        <TableCell>${sale.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Sales;
