import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Update User Details</Heading>

      <Row>
        <UpdateUserDataForm />
      </Row>

      <Heading as="h1">Update Password</Heading>

      <Row>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
