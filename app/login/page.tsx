import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export default function LoginPage() {
  const origin = headers().get("origin");

  const signInWithEmail = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${origin}/tweets`,
      },
    });
  };

  return (
    <div>
      <h1>Login by magic link</h1>
      <div>
        <form action={signInWithEmail}>
          <input type="email" name="email" required />
          <button type="submit" className="p-2 bg-blue-800">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
