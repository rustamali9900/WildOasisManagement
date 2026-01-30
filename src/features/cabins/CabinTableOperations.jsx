import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name" },
          { value: "regularPrice-asc", label: "Sort by Price" },
          { value: "maxCapacity-asc", label: "Sort by Capacity" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
