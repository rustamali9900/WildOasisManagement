import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import CabinRow from "./CabinRow";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";
import Empty from "../../ui/Empty";
import useCabins from "./useCabins";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";

  const { isPending, cabins, error } = useCabins();

  if (isPending) return <Spinner />;
  else if (!cabins?.length) return <Empty resource={"Cabins"} />;

  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => Number(cabin.discount) === 0);
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => Number(cabin.discount) > 0);
  }

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field] = sortBy.split("-");
  const sortedCabins = filteredCabins?.sort((a, b) => a[field] - b[field]);

  if (error) {
    toast.error(error.message);
    return;
  }

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {sortedCabins.map((el) => (
        <CabinRow cabin={el} key={el.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
