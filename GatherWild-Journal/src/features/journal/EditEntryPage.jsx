import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEntry } from "./journalService";
import { supabase } from "../../lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

/* 
This page will allow user to view their selected journal entry.
They may edit the existing entry from here.
The may delete the existing entry from here.
*/
export default function EditEntryPage() {

    // function to delete entry 


    // function to edit entry attributes 



    return (
        <div className="text-centered">
            <h1>Edit Entry Page</h1>
            <p>Function to edit existing entries will be added in the future</p>
        </div>
    );
}