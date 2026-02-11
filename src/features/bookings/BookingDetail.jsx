import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingDetails from "./useBookingDetail";
import ButtonGroup from "../../ui/ButtonGroup";
import BookingDataBox from "./BookingDataBox";
import ButtonText from "../../ui/ButtonText";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isPending, booking } = useBookingDetails();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isPending) return <Spinner />;

  const { status, id } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">
            Booking No. <strong>{id}</strong>
          </Heading>
          <Tag type={statusToTagName?.[status]}>
            {status?.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check In</Button>
        )}

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
