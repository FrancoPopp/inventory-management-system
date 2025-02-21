import {
  fetchVariants,
  fetchVariant,
  addVariant,
  deleteVariant,
  addStock,
} from "../services/variants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useVariants = (productId) => {
  const queryClient = useQueryClient();
  const {
    data: variants = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["variants", productId],
    queryFn: () => fetchVariants(productId),
  });

  const getVariant = async (id) => {
    return queryClient.fetchQuery({
      queryKey: ["variant", id],
      queryFn: () => fetchVariant(id),
    });
  };

  const addVariantMutation = useMutation({
    mutationFn: addVariant,
    onSuccess: () => {
      queryClient.invalidateQueries(["variants", productId]);
    },
  });

  const deleteVariantMutation = useMutation({
    mutationFn: deleteVariant,
    onSuccess: () => {
      queryClient.invalidateQueries(["variants", productId]);
    },
  });

  const addStockMutation = useMutation({
    mutationFn: addStock,
    onSuccess: () => {
      queryClient.invalidateQueries(["variants", productId]);
    },
    onError: (err) => console.log(err),
  });

  return {
    variants,
    isLoading,
    isError,
    addVariant: addVariantMutation.mutate,
    deleteVariant: deleteVariantMutation.mutate,
    addStock: addStockMutation.mutate,
    getVariant,
  };
};
