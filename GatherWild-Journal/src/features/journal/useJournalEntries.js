/* 
For reusable state logic. Handles fetching, loading state, errors, and refreshes
*/

import { supabase } from "@/lib/supabase";

export async function loadEntryData() {
    const { data, error } = await supabase.storage.from(`journal-images`).getPublicUrl('logo.png');

    console.log(data.publicUrl);
}