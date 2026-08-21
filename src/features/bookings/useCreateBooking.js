import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking as createBookingApi } from "../../services/apiBookings";

export function useCreateBooking() {
    const queryClient = useQueryClient();

    const {
        mutate: createBooking,
        isPending: isCreating,
    } = useMutation({
        mutationFn: (newBooking) => createBookingApi(newBooking),

        onSuccess: () => {
            toast.success("New booking created successfully");

            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },

        onError: (error) => {
            console.log("HOOK ERROR", error);
            toast.error(error.message || "Booking could not be created");
        },
    });

    return { createBooking, isCreating };
}