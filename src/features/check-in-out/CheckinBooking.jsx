import BookingDataBox from "../../features/bookings/BookingDataBox";
import useBookingDetail from "../bookings/useBookingDetail";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonGroup from "../../ui/ButtonGroup";
import CheckBox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import Row from "../../ui/Row";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [paid, setIsPaid] = useState();
  const { booking, isPending } = useBookingDetail();

  if (isPending) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {}

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <CheckBox>
          I confirm that {guests.fullName} has paid the full amount
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button $variation="primary" $size="medium" onClick={handleCheckin}>
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
