import TodayActivity from "../check-in-out/TodayActivity";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import useCabins from "../cabins/useCabins";
import DurationChart from "./DurationChart";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import SalesChart from "./SalesChart";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending: pendingBookings, bookings } = useRecentBookings();

  const { isPending: PendingStays, numDays, confirmedStays } = useRecentStays();

  const { cabins, isPending: PendingCabins } = useCabins();

  if (pendingBookings || PendingStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
