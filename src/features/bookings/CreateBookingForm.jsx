import { useForm } from "react-hook-form";
import { differenceInCalendarDays } from "date-fns";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SelectGuest from "../../ui/SelectGuest";

import { useGuests } from "../guests/useGuests";
import { useCabins } from "../cabins/useCabins";
import { useCreateBooking } from "./useCreateBooking";

function CreateBookingForm() {
  const { register, handleSubmit, reset } = useForm();
  const { guests, isLoading: isGuestsLoading } = useGuests();
  const { cabins, isLoading: isCabinsLoading } = useCabins();
  const { createBooking, isCreating } = useCreateBooking();

  function onSubmit(data) {
    const numNights = differenceInCalendarDays(
      new Date(data.endDate),
      new Date(data.startDate),
    );

    const cabin = cabins.find((cabin) => cabin.id === Number(data.cabinId));

    if (!cabin) return;

    if (Number(data.numGuests) > cabin.maxCapacity) {
      console.log("TOO MANY GUESTS");
      return;
    }

    const cabinPrice = cabin.regularPrice * numNights;

    const { guestId, cabinId, numGuests, startDate, endDate, observations } =
      data;

    const newBooking = {
      guestsId: Number(guestId),
      cabinId: Number(cabinId),
      numGuests: Number(numGuests),
      startDate,
      endDate,
      observations,
      numNights,
      cabinPrice,
      extrasPrice: 0,
      totalPrice: cabinPrice,
      status: "unconfirmed",
      hasBreakfast: false,
      isPaid: false,
    };

    console.log("NEW BOOKING:", newBooking);

    createBooking(newBooking);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Guest">
        <SelectGuest
          id="guestId"
          {...register("guestId", {
            required: "Please select a guest",
          })}
          disabled={isGuestsLoading || isCreating}
        >
          <option value="">Select a guest...</option>

          {guests?.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.fullName} — {guest.email}
            </option>
          ))}
        </SelectGuest>
      </FormRow>

      <FormRow label="Cabin">
        <SelectGuest
          id="cabinId"
          {...register("cabinId", {
            required: "Please select a cabin",
          })}
          disabled={isCabinsLoading || isCreating}
        >
          <option value="">Select a cabin...</option>

          {cabins?.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </SelectGuest>
      </FormRow>

      <FormRow label="Number of guests">
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "There must be at least one guest",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Start date">
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "Please select a start date",
          })}
          disabled={isGuestsLoading}
        />
      </FormRow>

      <FormRow label="End date">
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "Please select an end date",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Observations">
        <Input
          type="text"
          id="observations"
          {...register("observations")}
          disabled={isGuestsLoading}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          $size="medium"
          $variation="secondary"
          onClick={reset}
          disabled={isCreating}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          $size="medium"
          $variation="primary"
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
