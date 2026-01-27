import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Row from "../ui/Row";
import { useState } from "react";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>

      <Row>
        <CabinTable />
      </Row>
      <Button
        $variation="primary"
        $size="medium"
        onClick={() => setShowForm((form) => !form)}
      >
        Add Cabin
      </Button>
      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
