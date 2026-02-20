import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  console.log(bookingId);
  return (
    <Button variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
