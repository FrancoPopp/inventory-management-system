import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProduct,
  addProduct,
  deleteProduct,
} from "../services/products";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const getProduct = async (id) => {
    return fetchProduct(id);
  };

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return {
    products,
    isLoading,
    isError,
    getProduct,
    addProduct: addProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
  };
};
