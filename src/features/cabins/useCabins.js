import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
export default function useCabins() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isPending, cabins, error };
}
