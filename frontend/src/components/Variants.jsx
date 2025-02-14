import { useState, useEffect } from "react";
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
import { Input } from "./Input";
import { Button } from "./Button";
import { LuArrowLeft, LuPlus, LuTrash2 } from "react-icons/lu";

const mockVariants = [
  { id: 1, color: "Red", size: "S", stock: 10 },
  { id: 2, color: "Black", size: "M", stock: 15 },
  { id: 3, color: "Blue", size: "L", stock: 8 },
  { id: 4, color: "White", size: "XL", stock: 12 },
];

function Variants() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [variants, setVariants] = useState(mockVariants);
  const [newVariant, setNewVariant] = useState({
    size: "",
    color: "",
    stock: "",
  });
  const [isAddingVariant, setIsAddingVariant] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setProduct({
      id,
      name: "Gucci Jeans",
      category: "Jeans",
      price: 89.99,
    });
  }, [id]);

  const handleAddVariant = (e) => {
    e.preventDefault();

    const variantToAdd = {
      size: newVariant.size,
      color: newVariant.color,
      stock: Number.parseFloat(newVariant.stock),
    };

    setVariants((prev) => [...prev, variantToAdd]);
    setNewVariant({ size: "", color: "", stock: "" });
    setIsAddingVariant(false);
  };

  const handleAddStock = (id) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, stock: variant.stock + 1 } : variant,
      ),
    );
  };

  const handleDeleteVariant = (id) => {
    setVariants((prev) => prev.filter((variant) => variant.id !== id));
  };

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
          <h1 className="text-3xl font-bold">
            {product?.name ?? "Cargando... "}
          </h1>
        </div>
        <div className="flex w-1/2 justify-end">
          <Button
            className="h-10 bg-[#171717] px-4 py-2 text-[#fafafa] hover:bg-[#171717]/90"
            onClick={() => setIsAddingVariant(true)}
          >
            <LuPlus className="mr-2 h-4 w-4" /> Agregar modelo
          </Button>
        </div>
      </div>
      {isAddingVariant && (
        <div className="rounded-md bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">Agregar nuevo modelo</h2>
          <form onSubmit={handleAddVariant} className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="size"
                name="size"
                placeholder="Talle"
                autoComplete="off"
                value={newVariant.size}
                onChange={(e) =>
                  setNewVariant((prev) => ({ ...prev, size: e.target.value }))
                }
              />
              <Input
                id="color"
                name="color"
                placeholder="Color"
                autoComplete="off"
                value={newVariant.color}
                onChange={(e) =>
                  setNewVariant((prev) => ({
                    ...prev,
                    color: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="stock"
                name="stock"
                type="number"
                placeholder="Stock"
                autoComplete="off"
                value={newVariant.stock}
                onChange={(e) =>
                  setNewVariant((prev) => ({ ...prev, stock: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                className="h-10 border border-[#cfcfcf] px-4 py-2 hover:bg-[#c3c3c3] hover:text-[#171717]"
                onClick={() => setIsAddingVariant(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="h-10 bg-[#171717] px-4 py-2 text-[#fafafa] hover:bg-[#171717]/90"
              >
                Agregar modelo
              </Button>
            </div>
          </form>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Detalles del producto</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Categoría:</strong> {product?.category ?? "Cargando..."}
            </p>
            <p>
              <strong>Precio:</strong> $
              {product?.price?.toFixed(2) ?? "Cargando..."}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Modelos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Talle</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {variants?.map((variant) => (
                    <TableRow key={variant.id}>
                      <TableCell>{variant.size}</TableCell>
                      <TableCell>{variant.color}</TableCell>
                      <TableCell>{variant.stock}</TableCell>
                      <TableCell className="flex justify-evenly gap-2">
                        <Button
                          className="group h-10 min-w-1/2 text-center"
                          onClick={() => handleAddStock(variant.id)}
                        >
                          <LuPlus
                            className="size-6 transition-all duration-200 group-hover:scale-150"
                            color="30ca1c"
                          />
                        </Button>
                        <Button
                          className="group h-10 min-w-1/2 text-center"
                          onClick={() => handleDeleteVariant(variant.id)}
                        >
                          <LuTrash2
                            className="size-6 transition-all duration-200 group-hover:scale-150"
                            color="d65850"
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
    </div>
  );
}

export default Variants;
