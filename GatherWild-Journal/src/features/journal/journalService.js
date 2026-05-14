/* 
Supabase logic
*/
import { supabase } from "@/lib/supabase";

export async function createEntry(entryData) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return await supabase
        .from("journal_entries")
        .insert([
            {
                ...entryData,
                user_id: user.id,
            },
        ]);
}