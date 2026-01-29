import { useForm } from "react-hook-form";
import styled from "styled-components";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useEditSettings } from "./useEditSettings";

// Styled components for the button layout
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  padding-top: 1.2rem;
`;

const FormButton = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.$variation === "primary" &&
    `
    color: var(--color-brand-50);
    background-color: var(--color-brand-600); /* #4f46e5 */
    &:hover {
      background-color: var(--color-brand-700);
    }
  `}

  ${(props) =>
    props.$variation === "secondary" &&
    `
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    &:hover {
      background-color: var(--color-grey-50);
    }
  `}

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-grey-300);
    color: var(--color-grey-500);
  }
`;

function UpdateSettingsForm({ onClose }) {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { editSetting, isEditing } = useEditSettings();

  // 1. Setup React Hook Form
  const { register, handleSubmit, reset } = useForm();

  if (isPending) return <Spinner />;

  // 2. Handle successful submission
  function onSubmit(data) {
    editSetting(data, {
      onSuccess: () => {
        onClose?.(); // Closes the form and returns to menu
      },
    });
  }

  // 3. Handle manual cancel
  function handleCancel(e) {
    e.preventDefault(); // Prevent form trigger
    reset(); // Reset to initial values
    onClose?.(); // "Shut" the form back to menu
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          disabled={isEditing}
          {...register("minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          disabled={isEditing}
          {...register("maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          disabled={isEditing}
          {...register("maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          disabled={isEditing}
          {...register("breakfastPrice")}
        />
      </FormRow>

      <ButtonGroup>
        <FormButton
          $variation="secondary"
          type="button"
          disabled={isEditing}
          onClick={handleCancel}
        >
          Cancel
        </FormButton>
        <FormButton $variation="primary" disabled={isEditing}>
          Update settings
        </FormButton>
      </ButtonGroup>
    </Form>
  );
}

export default UpdateSettingsForm;
