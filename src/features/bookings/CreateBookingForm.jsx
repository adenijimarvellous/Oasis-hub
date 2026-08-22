import { useForm, useWatch } from "react-hook-form";
import { differenceInCalendarDays } from "date-fns";
import toast from "react-hot-toast";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SelectGuest from "../../ui/SelectGuest";

import { useGuests } from "../guests/useGuests";
import { useCabins } from "../cabins/useCabins";
import { useCreateBooking } from "./useCreateBooking";
import { getToday } from "../../utils/helpers";
import styled from "styled-components";

const GuestField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const AddGuestLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  align-self: flex-start;

  font-size: 1.3rem;
  color: var(--color-brand-600);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function CreateBookingForm({ onShowGuestForm }) {
  const { register, handleSubmit, reset, control } = useForm();

  const { guests, isLoading: isGuestsLoading } = useGuests();
  const { cabins, isLoading: isCabinsLoading } = useCabins();
  const { createBooking, isCreating } = useCreateBooking();

  const startDate = useWatch({
    control,
    name: "startDate",
  });

  function onSubmit(data) {
    const numNights = differenceInCalendarDays(
      new Date(data.endDate),
      new Date(data.startDate),
    );

    const cabin = cabins.find((cabin) => cabin.id === Number(data.cabinId));

    if (!cabin) return;

    // Validate number of guests
    if (Number(data.numGuests) > cabin.maxCapacity) {
      toast.error(
        `This cabin can accommodate a maximum of ${cabin.maxCapacity} guests.`,
      );
      return;
    }

    // Validate dates
    if (new Date(data.startDate) < new Date(getToday())) {
      toast.error("Start date cannot be in the past.");
      return;
    }

    if (numNights <= 0) {
      toast.error("End date must be after the start date.");
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

    createBooking(newBooking, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Guest" labelFor="guestId">
        <GuestField>
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

          <AddGuestLink
            type="button"
            onClick={onShowGuestForm}
            disabled={isCreating}
          >
            Add new guest
          </AddGuestLink>
        </GuestField>
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
          min={getToday()}
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
          min={startDate || getToday()}
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
