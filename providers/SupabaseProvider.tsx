"use client";

import { useState } from "react";
import { Database } from "@/types_db";
import { createClient } from "@/utils/supabase/component";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [supabaseClient] = useState(() => createClient());

  return (
    <></>
    // <SessionContextProvider supabaseClient={supabaseClient}>
    //     {children}
    // </SessionContextProvider>
  );
};
