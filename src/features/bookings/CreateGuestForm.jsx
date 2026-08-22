import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateGuest } from "./useCreateGuest";

function CreateGuestForm({ onClose, onGuestCreated }) {
  const { register, handleSubmit, reset } = useForm();

  const { createGuest, isCreating } = useCreateGuest();

  function onSubmit(data) {
    createGuest(data, {
      onSuccess: (newGuest) => {
        reset();
        onGuestCreated(newGuest);
        onClose();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name">
        <Input
          type="text"
          id="fullName"
          disabled={isCreating}
          {...register("fullName", {
            required: "Full name is required",
          })}
        />
      </FormRow>

      <FormRow label="Email">
        <Input
          type="email"
          id="email"
          disabled={isCreating}
          {...register("email", {
            required: "Email is required",
          })}
        />
      </FormRow>

      <FormRow label="National ID">
        <Input
          type="text"
          id="nationalID"
          disabled={isCreating}
          {...register("nationalID", {
            required: "National ID is required",
          })}
        />
      </FormRow>

      <FormRow label="Nationality">
        <Input
          type="text"
          id="nationality"
          disabled={isCreating}
          {...register("nationality", {
            required: "Nationality is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          type="button"
          $size="medium"
          $variation="secondary"
          onClick={onClose}
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
          Create guest
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
