import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useRecentBooking } from "./useRecentBooking";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: auto auto auto;
  gap: clamp(1.6rem, 2vw, 2.4rem);
  min-width: 0;

  & > * {
    min-width: 0;
  }

  @media (max-width: 75em) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* @media (max-width: 60em) {
    grid-template-columns: 1fr;
  } */

  @media (max-width: 36em) {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }
`;

function DashboardLayout() {
  const { bookings, isLoading: isBookingsLoading } = useRecentBooking();
  const {
    filteredStays,
    isLoading: isStaysLoading,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isCabinsLoading } = useCabins();

  if (isBookingsLoading || isStaysLoading || isCabinsLoading) {
    return <Spinner />;
  }
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        filteredStays={filteredStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart filteredStays={filteredStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
