import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useEditSettings() {
  const queryClient = useQueryClient();

  const { mutate: editSetting, isPending: isEditing } = useMutation({
    mutationFn: updateSetting,

    onSuccess: () => {
      toast.success("Settings Edited Successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { editSetting, isEditing };
}
