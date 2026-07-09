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

export async function createEditCabin(newCabin, id) {
    console.log(newCabin, id);
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    // Generate a unique image name
    let imageName;
    if (!hasImagePath) {
        imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    }
    // Public URL where the image will be accessible
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    // 1. Create a new cabin in the database
    let query = supabase.from("cabins");
    //A) Create
    if (!id)
        query = query
            .insert([{ ...newCabin, image: imagePath }])
            .select();
    //B) Update
    if (id)
        query = query
            .update({ ...newCabin, image: imagePath })
            .eq("id", id)
            .select();
    const { data, error } = await query;
    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }


    // 2. Upload the image to Supabase Storage
    if (hasImagePath) {
        return data;
    }

    if (!hasImagePath) {
        const { error: storageError } = await supabase.storage
            .from("cabin-images")
            .upload(imageName, newCabin.image);

        // 3. If the image upload fails, delete the cabin from the database
        if (storageError) {
            if (!id) {
                await supabase
                    .from("cabins")
                    .delete()
                    .eq("id", data[0].id);
            }

            console.error(storageError);
            throw new Error("Cabin image could not be uploaded");
        }
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