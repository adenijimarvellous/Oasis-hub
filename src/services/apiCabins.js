import supabase from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error("Cabins could not get loaded");
    }
    return data;
};

export async function createCabin(newCabin) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

    // Generate a unique image name
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

    // Public URL where the image will be accessible
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create a new cabin in the database
    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    // 2. Upload the image to Supabase Storage
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. If the image upload fails, delete the cabin from the database
    if (storageError) {
        await supabase
            .from("cabins")
            .delete()
            .eq("id", data[0].id);

        console.error(storageError);
        throw new Error("Cabin image could not be uploaded, and the cabin wasn't created.");
    }

    return data;
}

export async function deleteCabin(id) {

    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq("id", id)

    if (error) {
        console.error(error);
        throw new Error("Cabins could not get deleted");
    }

    return data;

};