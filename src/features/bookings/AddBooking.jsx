import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";

function AddBooking() {
  return (
    <Modal>
      <Modal.Open opens="booking-form">
        <Button $size="medium" $variation="primary">
          Add booking
        </Button>
      </Modal.Open>

      <Modal.Window name="booking-form">
        <CreateBookingForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddBooking;
