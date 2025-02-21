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
import { Input } from "./Input";
import { Select, SelectItem } from "./Select";
import { Button } from "./Button";
import { LuArrowLeft, LuPlus, LuTrash2 } from "react-icons/lu";
import { useProducts } from "../hooks/useProducts";
import { useVariants } from "../hooks/useVariants";
import { useColors } from "../hooks/useColors";
import { useCategories } from "../hooks/useCategories";

function Variants() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProduct } = useProducts();
  const {
    variants,
    isLoading: isVariantsLoading,
    isError: isVariantsError,
    addVariant,
    deleteVariant,
    addStock,
  } = useVariants(id);
  const { colors, getColorName } = useColors();
  const { getCategoryName } = useCategories();
  const [product, setProduct] = useState(null);
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [newVariant, setNewVariant] = useState({
    size: 1,
    colorId: "",
    stockLevel: 1,
  });

  useEffect(() => {
    getProduct(id).then((product) => {
      setProduct(product);
    });
  }, [id]);

  const handleAddVariant = (e) => {
    e.preventDefault();

    addVariant({ ...newVariant, productId: product.id });
    setNewVariant({ size: 1, colorId: "", stockLevel: 1 });
    setIsAddingVariant(false);
  };

  const handleAddStock = (id) => {
    addStock(id);
  };

  const handleDeleteVariant = (id) => {
    deleteVariant(id);
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
                type="number"
                placeholder="Talle"
                autoComplete="off"
                value={newVariant.size}
                onChange={(e) =>
                  setNewVariant((prev) => ({
                    ...prev,
                    size: Number.parseInt(e.target.value),
                  }))
                }
              />
              <Select
                id="color"
                name="color"
                value={newVariant.colorId}
                onChange={(e) =>
                  setNewVariant((prev) => ({
                    ...prev,
                    colorId: e.target.value,
                  }))
                }
              >
                <SelectItem value="" disabled>
                  Selecciona un color
                </SelectItem>
                {colors.map((color) => (
                  <SelectItem key={color.id} value={color.id}>
                    {color.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="stock"
                name="stock"
                type="number"
                placeholder="Stock"
                autoComplete="off"
                value={newVariant.stockLevel}
                onChange={(e) =>
                  setNewVariant((prev) => ({
                    ...prev,
                    stockLevel: Number.parseInt(e.target.value),
                  }))
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
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Detalles del producto</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Categoría:</strong>{" "}
              {getCategoryName(product?.categoryId) ?? "Cargando..."}
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
                      <TableCell>{getColorName(variant.colorId)}</TableCell>
                      <TableCell>{variant.stockLevel}</TableCell>
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
