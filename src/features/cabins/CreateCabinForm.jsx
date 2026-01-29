import FileInput from "../../ui/FileInput";
import { useForm } from "react-hook-form";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        },
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        },
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow errors={errors?.name?.message} label={"Cabin name"}>
        <Input
          type="text"
          id="name"
          disabled={isCreating || isEditing}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow errors={errors?.maxCapacity?.message} label={"Maximum Guests"}>
        <Input
          type="number"
          disabled={isCreating || isEditing}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1" },
          })}
        />
      </FormRow>

      <FormRow errors={errors?.regularPrice?.message} label={"Regular Price"}>
        <Input
          disabled={isCreating || isEditing}
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow errors={errors?.discount?.message} label={"Discount"}>
        <Input
          type="number"
          disabled={isCreating || isEditing}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value < getValues().regularPrice ||
              "Discount should always be less than the price",
          })}
        />
      </FormRow>

      <FormRow errors={errors?.description?.message} label={"Description"}>
        <Textarea
          type="text"
          disabled={isCreating || isEditing}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          $size="medium"
          type={"reset"}
          onClick={() => onClose?.()}
        >
          Cancel
        </Button>
        <Button
          $variation="primary"
          $size="medium"
          disabled={isCreating || isEditing}
        >
          {isEditSession ? "Update" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
