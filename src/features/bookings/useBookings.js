import { getBookings } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export default function useBookings() {
  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isPending, bookings, error };
}
