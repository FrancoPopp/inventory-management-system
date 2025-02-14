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

const mockProducts = [
  { id: 1, name: "T-Shirt", category: "Top", price: 19.99 },
  { id: 2, name: "Jeans", category: "Bottom", price: 49.99 },
  { id: 3, name: "Sneakers", category: "Shoes", price: 79.99 },
];

function Inventory() {
  const [products, setProducts] = useState(mockProducts);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const navigate = useNavigate();

  const handleAddProduct = () => {
    const productToAdd = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: Number.parseFloat(newProduct.price),
    };
    setProducts((prev) => [...prev, productToAdd]);
    setNewProduct({ name: "", category: "", price: "" });
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-3xl font-bold">Productos</h2>
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
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                id="category"
                name="category"
                placeholder="Categoría"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Precio"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                className="h-10 border border-[#cfcfcf] px-4 py-2 hover:bg-[#c3c3c3] hover:text-[#171717]"
                onClick={() => setIsAddingProduct(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 bg-[#171717] px-4 py-2 text-[#fafafa] hover:bg-[#171717]/90"
              >
                Add Product
              </Button>
            </div>
          </form>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-indigo-300">
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="even:bg-[#eaeaea] hover:bg-[#e3e3e3]"
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="flex">
                  <Button
                    className="mr-auto h-10 min-w-1/2 border border-[#cfcfcf] px-4 py-2 hover:bg-[#c3c3c3] hover:text-[#171717]"
                    onClick={() => navigate(`${product.id}`)}
                  >
                    Ver
                    <LuArrowRight className="min-w-8 md:hidden lg:block" />
                  </Button>
                  <Button
                    className="group mx-auto h-10 min-w-1/2 text-center"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <LuTrash2
                      color="#d65850"
                      className="h-6 w-6 transition-all duration-200 group-hover:size-8"
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
