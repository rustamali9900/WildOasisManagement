import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: userLogout, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout Successful");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { userLogout, isPending };
}
