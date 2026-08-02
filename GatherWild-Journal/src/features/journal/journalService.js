/* 
Supabase logic
*/
import { supabase } from "@/lib/supabase";


export async function createEntry(entryData) {
    console.log("ENTRY DATA:", entryData); // for testing

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

    console.log("RETRIEVED ENTRY DATA: " + data); // for testing

    return { data, error };

};

export async function getEntries() {

    const {
        data,
        error,
    } = await supabase
        .from("journal_entries")
        .select("*")
        .order("date_found", { ascending: false });

    return {
        data,
        error,
    };
};

