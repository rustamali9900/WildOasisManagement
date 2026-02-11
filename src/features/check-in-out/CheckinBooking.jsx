import BookingDataBox from "../../features/bookings/BookingDataBox";
import useBookingDetail from "../bookings/useBookingDetail";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import ButtonGroup from "../../ui/ButtonGroup";
import { useCheckin } from "./useChecking";
import CheckBox from "../../ui/Checkbox";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useState } from "react";
import Row from "../../ui/Row";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isPending } = useBookingDetail();

  if (isPending) return <Spinner />;

  return <CheckinForm key={booking.id} booking={booking} moveBack={moveBack} />;
}

function CheckinForm({ booking, moveBack }) {
  const [paid, setIsPaid] = useState(booking.isPaid);
  const [breakfast, setBreakfast] = useState(false);
  const { checkIn, isCheckingIn } = useCheckin();

  const { settings, isPending: isPendingSettings } = useSettings();

  if (isPendingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!paid) return;

    if (breakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={breakfast}
            onChange={() => {
              setBreakfast((s) => !s);
              setIsPaid(false);
            }}
            id="breakfast"
          >
            Want to Add Breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={paid}
          onChange={() => setIsPaid((s) => !s)}
          id="confirm"
          disabled={isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the full amount of{" "}
          {!breakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)}`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button
          $variation="primary"
          $size="medium"
          onClick={handleCheckin}
          disabled={!paid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" $size="small" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
