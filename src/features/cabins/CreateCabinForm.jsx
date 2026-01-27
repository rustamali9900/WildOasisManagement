import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import FileInput from "../../ui/FileInput";
import { useForm } from "react-hook-form";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,

    onSuccess: () => {
      toast.success("Cabin Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },

    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow errors={errors?.name?.message} label={"Cabin name"}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow errors={errors?.maxCapacity?.message} label={"Maximum Guests"}>
        <Input
          type="number"
          disabled={isPending}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1" },
          })}
        />
      </FormRow>

      <FormRow errors={errors?.regularPrice?.message} label={"Regular Price"}>
        <Input
          disabled={isPending}
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow errors={errors?.discount?.message} label={"Discount"}>
        <Input
          type="number"
          disabled={isPending}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should always be less than the price",
          })}
        />
      </FormRow>

      <FormRow errors={errors?.description?.message} label={"Description"}>
        <Textarea
          type="number"
          disabled={isPending}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      {/* <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow> */}
      {/* 
      <FormRow>
        <Button $variation="secondary" $size="medium" type={"reset"}>
          Cancel
        </Button>
        <Button $variation="primary" $size="medium" disabled={isPending}>
          Add cabin
        </Button>
      </FormRow> */}
      <Button $variation="primary" $size="medium" disabled={isPending}>
        Add cabin
      </Button>
    </Form>
  );
}

export default CreateCabinForm;
