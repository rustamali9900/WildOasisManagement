import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import { useState } from "react";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";

const TableRow = styled.div`
  display: grid;
  /* Standard 6-column grid for desktop */
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  /* Responsive: Tablet/Large Phone */
  @media (max-width: 992px) {
    grid-template-columns: 0.8fr 2fr 1fr 1fr; /* Merge/Remove some columns */
    column-gap: 1.6rem;

    /* Hide the "Fits upto..." column on tablets to save space */
    & > div:nth-child(3) {
      display: none;
    }
  }

  /* Responsive: Mobile */
  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr; /* Switch to 2 columns */
    row-gap: 1.2rem;
    padding: 1.6rem;

    /* Hide image or non-essentials on very small screens if desired */
    & > div:nth-child(5) {
      /* Discount */
      display: none;
    }
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5);

  @media (max-width: 600px) {
    transform: scale(1); /* Reset scale on mobile */
    width: 100%;
    max-width: 80px;
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;

  @media (max-width: 600px) {
    text-align: right;
  }
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: start;

  @media (max-width: 600px) {
    grid-column: 1 / -1; /* Buttons take full width at the bottom */
    justify-content: flex-end;
    border-top: 1px solid var(--color-grey-100);
    padding-top: 1rem;
  }

  & button {
    border: none;
    border-radius: var(--border-radius-sm);
    padding: 0.4rem 0.8rem;
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }

  & button:first-child {
    background-color: var(--color-red-700);
    color: var(--color-red-100);

    &:hover {
      background-color: var(--color-red-800);
    }
  }

  & button:last-child {
    background-color: #4f46e5;
    color: #fff;

    &:hover {
      background-color: #4338ca;
    }
  }
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { id, name, regularPrice, maxCapacity, discount, image, description } =
    cabin;

  const { isPending, mutate } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicateCabin() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      description,
      discount,
      image,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <div style={{ textAlign: "center" }}>&mdash;</div>
        )}
        <ButtonGroup>
          <button onClick={() => mutate(id)} disabled={isPending}>
            <HiTrash />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </button>
          <button onClick={handleDuplicateCabin} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
        </ButtonGroup>
      </TableRow>
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <CreateCabinForm
            cabinToEdit={cabin}
            onClose={() => setShowForm(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default CabinRow;
