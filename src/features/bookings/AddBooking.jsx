// import { useState } from "react";
// import Modal from "../../ui/Modal";
// import Button from "../../ui/Button";
// import CreateBookingForm from "./CreateBookingForm";
// import CreateGuestForm from "./CreateGuestForm";

// function AddBooking() {
//   const [showGuestForm, setShowGuestForm] = useState(false);

//   return (
//     <Modal>
//       <Modal.Open opens="booking-form">
//         <Button
//           $size="medium"
//           $variation="primary"
//           onClick={() => setShowGuestForm(false)}
//         >
//           Add booking
//         </Button>
//       </Modal.Open>

//       <Modal.Window name="booking-form">
//         {!showGuestForm ? (
//           <CreateBookingForm onShowGuestForm={() => setShowGuestForm(true)} />
//         ) : (
//           <CreateGuestForm onCloseModal={() => setShowGuestForm(false)} />
//         )}
//       </Modal.Window>
//     </Modal>
//   );
// }

// export default AddBooking;

// import Modal from "../../ui/Modal";
// import Button from "../../ui/Button";
// import CreateBookingForm from "./CreateBookingForm";

// function AddBooking() {
//   return (
//     <Modal>
//       <Modal.Open opens="booking-form">
//         <Button $size="medium" $variation="primary">
//           Add booking
//         </Button>
//       </Modal.Open>

//       <Modal.Window name="booking-form">
//         <CreateBookingForm />
//       </Modal.Window>
//     </Modal>
//   );
// }

// export default AddBooking;

import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
import CreateGuestForm from "./CreateGuestForm";

function AddBooking() {
  const [showGuestForm, setShowGuestForm] = useState(false);

  return (
    <Modal>
      <Modal.Open opens="booking-form">
        <Button $size="medium" $variation="primary">
          Add booking
        </Button>
      </Modal.Open>

      <Modal.Window
        name="booking-form"
        onClose={() => {
          if (showGuestForm) {
            setShowGuestForm(false);
            return true;
          }

          return false;
        }}
      >
        {!showGuestForm ? (
          <CreateBookingForm onShowGuestForm={() => setShowGuestForm(true)} />
        ) : (
          <CreateGuestForm
            onClose={() => setShowGuestForm(false)}
            onGuestCreated={() => setShowGuestForm(false)}
          />
        )}
      </Modal.Window>
    </Modal>
  );
}

export default AddBooking;
