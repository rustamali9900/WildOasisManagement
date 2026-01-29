import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useState } from "react";

function AddCabin() {
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        $variation="primary"
        $size="medium"
        onClick={() => setOpenModal((form) => !form)}
      >
        Add Cabin
      </Button>

      {isOpenModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <CreateCabinForm onClose={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}
export default AddCabin;
