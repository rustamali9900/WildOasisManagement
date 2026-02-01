import { useParams } from "react-router";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export default function useBookingDetails() {
  const { bookingId } = useParams();
  const {
    isPending,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
  });

  return { isPending, booking, error };
}
