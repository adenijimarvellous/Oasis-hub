import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGuest as createGuestApi } from "../../services/apiGuests";

export function useCreateGuest() {
    const queryClient = useQueryClient();

    const { mutate: createGuest, isPending: isCreating } = useMutation({
        mutationFn: createGuestApi,

        onSuccess: () => {
            toast.success("New guest created successfully");

            queryClient.invalidateQueries({
                queryKey: ["guests"],
            });
        },

        onError: (error) => {
            console.error("GUEST ERROR", error);
            toast.error(error.message || "Guest could not be created");
        },
    });

    return { createGuest, isCreating };
}