import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),

    onSuccess: (data) => {
      toast.success(`Booking with ${data.id} is Checked In `);
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },

    onError: () => {
      toast.error("There was an error while Checking In");
    },
  });

  return { checkIn, isCheckingIn };
}
