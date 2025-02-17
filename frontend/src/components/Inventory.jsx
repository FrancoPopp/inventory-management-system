import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Table";
import { Button } from "./Button";
import { Input } from "./Input";
import { LuArrowRight, LuPlus, LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { Label } from "./Label";
import { Select, SelectItem } from "./Select";

function Inventory() {
  const navigate = useNavigate();
  const {
    products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    addProduct,
    deleteProduct,
  } = useProducts();
  const { categories, getCategoryName } = useCategories();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    categoryId: "",
    price: 0,
  });

  const handleAddProduct = (e) => {
    e.preventDefault();

    addProduct(newProduct);
    setNewProduct({ name: "", categoryId: "", price: 0 });
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
  };

  if (isProductsLoading) return <div>Cargando...</div>;
  if (isProductsError) return <div>Error</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Button
          className="h-10 bg-[#171717] px-4 py-2 text-[#fafafa] hover:bg-[#171717]/90"
          onClick={() => setIsAddingProduct(true)}
        >
          <LuPlus className="mr-2 h-4 w-4" /> Agregar producto
        </Button>
      </div>
      {isAddingProduct && (
        <div className="rounded-md bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">Agregar nuevo producto</h2>
          <form onSubmit={handleAddProduct} className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="name"
                name="name"
                placeholder="Nombre"
                autoComplete="off"
                value={newProduct.name}
                required
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Select
                id="category"
                name="category"
                value={newProduct.categoryId}
                required
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                  }))
                }
              >
                <SelectItem value="" disabled>
                  Selecciona una categoría
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    disabled={category.id === newProduct.categoryId}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Precio"
                autoComplete="off"
                value={newProduct.price}
                required
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    price: Number.parseFloat(e.target.value),
                  }))
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                className="h-10 border border-[#cfcfcf] px-4 py-2 hover:bg-[#c3c3c3] hover:text-[#171717]"
                onClick={() => setIsAddingProduct(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="h-10 bg-[#171717] px-4 py-2 text-[#fafafa] hover:bg-[#171717]/90"
              >
                Agregar producto
              </Button>
            </div>
          </form>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                onClick={() => {
                  navigate(`${product.id}`);
                }}
                className="cursor-pointer hover:bg-[#e3e3e3]"
                key={product.id}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="flex justify-evenly">
                  <Button
                    className="group h-10 min-w-1/2 text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(product.id);
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
    </div>
  );
}

export default Inventory;
