import { supabase } from "@/lib/supabase";

/* 
Contains reusable database functions for Supabase logic
*/

export async function createEntry(entryData) {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from("journal_entries")
        .insert([{
            ...entryData,
            user_id: user.id
        }]);

    return { data, error };
};

export async function getUserID() {
    const { data: { user }, } = await supabase.auth.getUser();
    const user_id = user.id
    return user_id;
};

export async function getEntry(id) {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from("journal_entires")
        .getEntry();
    return { data, error };
};

export async function getEntries() {
    const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .order("date", { ascending: false });
    return { data, error };
}

export async function updateEntry(entryID, entryData) {
    console.log("entryId:", entryID);
    console.log("entryData:", entryData);

    const { data, error } = await supabase
        .from("journal_entries")
        .update(entryData)
        .eq("id", entryID)
        .select();

    console.log("DATA: ", data);

    return { data, error };
}

export async function deleteEntry(userId) {
    const { error } = await supabase
        .from("journal_entries")
        .delete()
        .eq("id", userId);
}

// function to properly format and upload images to supabase
export async function uploadJournalImage(file, userId) {
    if (!file) {
        return {
            publicUrl: null,
            error: null,
        };
    }
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
        .from("journal-images").upload(fileName, file);

    if (uploadError) {
        return {
            publicUrl: null,
            error: uploadError,
        };
    }

    const { data } = supabase.storage
        .from("journal-images")
        .getPublicUrl(fileName);

    return {
        publicUrl: data.publicUrl,
        error: null,
    };
}
