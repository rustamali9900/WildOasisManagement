import BookingDataBox from "../../features/bookings/BookingDataBox";
import useBookingDetail from "../bookings/useBookingDetail";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonGroup from "../../ui/ButtonGroup";
import CheckBox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useState } from "react";
import Row from "../../ui/Row";
import { useChecking } from "./useChecking";

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
  const { checkIn, isCheckingIn } = useChecking();

  const { id: bookingId, guests, totalPrice } = booking;

  function handleCheckin() {
    if (!paid) return;
    checkIn(bookingId);
  }

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <CheckBox
          checked={paid || booking.isPaid}
          onChange={() => setIsPaid((s) => !s)}
          id="confirm"
          disabled={isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the full amount of{" "}
          {totalPrice}$
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
