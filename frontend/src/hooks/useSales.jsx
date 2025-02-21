import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { fetchSales, fetchSale, addSale, deleteSale } from "../services/sales";

export const useSales = () => {
  const queryClient = new QueryClient();
  const {
    data: sales = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["sales"],
    queryFn: fetchSales,
  });

  const getSale = async (id) => {
    return fetchSale(id);
  };

  const addSaleMutation = useMutation({
    mutationFn: addSale,
    onSuccess: () => {
      queryClient.invalidateQueries(["sales"]);
      refetch();
    },
  });

  const deleteSaleMutation = useMutation({
    mutationFn: deleteSale,
    onSuccess: () => {
      queryClient.invalidateQueries(["sales"]);
      refetch();
    },
  });

  return {
    sales,
    isLoading,
    isError,
    addSale: addSaleMutation.mutate,
    deleteSale: deleteSaleMutation.mutate,
    getSale,
  };
};
