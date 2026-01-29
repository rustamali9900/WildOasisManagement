import { useForm } from "react-hook-form";
import styled from "styled-components";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";

// Styled Components for the buttons
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  padding-top: 1.2rem;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.2s;

  /* Primary Update Button style */
  ${(props) =>
    props.$variation === "primary" &&
    `
    color: var(--color-brand-50);
    background-color: var(--color-brand-600); /* #4f46e5 */
    &:hover {
      background-color: var(--color-brand-700);
    }
  `}

  /* Secondary Cancel Button style */
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

function UpdateSettingsForm() {
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
  const { register, handleSubmit, reset } = useForm();

  if (isPending) return <Spinner />;

  function onSubmit(data) {
    // Only send values that aren't empty
    editSetting(data);
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

      {/* Button Section */}
      <ButtonGroup>
        <Button
          type="button"
          $variation="secondary"
          disabled={isEditing}
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button $variation="primary" disabled={isEditing}>
          Update settings
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default UpdateSettingsForm;
