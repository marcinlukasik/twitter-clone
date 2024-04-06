"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export const LogoutButton = () => {
  async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    return redirect("/login");
  }

  return (
    <button className="p-2 bg-red-400" onClick={signOut}>
      Log out
    </button>
  );
};
