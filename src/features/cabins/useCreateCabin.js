import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {

    const queryClient = useQueryClient();

    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: (newCabin) => createEditCabin(newCabin),
        onSuccess: () => {
            toast.success("New cabin created successfully");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            //reset();
        },
        onError: (error) => {
            console.log("HOOK ERROR", error);
            toast.error(error.message || "Cabin could not be created");
        }
    });

    return { createCabin, isCreating };
}