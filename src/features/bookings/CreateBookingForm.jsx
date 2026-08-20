import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SelectGuest from "../../ui/SelectGuest";
import { useGuests } from "../guests/useGuests";
import { useCabins } from "../cabins/useCabins";

function CreateBookingForm() {
  const { register, handleSubmit, reset } = useForm();
  const { guests, isLoading: isGuestsLoading } = useGuests();
  const { cabins, isLoading: isCabinsLoading } = useCabins();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Guest">
        <SelectGuest
          id="guestId"
          {...register("guestId", {
            required: "Please select a guest",
          })}
          disabled={isGuestsLoading}
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
          disabled={isCabinsLoading}
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
        />
      </FormRow>

      <FormRow label="Observations">
        <Input type="text" id="observations" {...register("observations")} />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          $size="medium"
          $variation="secondary"
          onClick={reset}
        >
          Cancel
        </Button>

        <Button type="submit" $size="medium" $variation="primary">
          Create booking
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
