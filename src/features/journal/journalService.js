/* 
Supabase logic
*/
export async function createEntry(data) {
    return SupabaseClient.from("journal_entries").insert(data);
}
// use with -->
// await createEntry(formData);
