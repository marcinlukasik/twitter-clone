import { LogoutButton } from "@/components/atoms/LogoutButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function TweetsPage() {
  const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }

  // Create a function to handle inserts
  const handleInserts = (payload: unknown) => {
    console.log("Change received!", payload);
  };

  // Listen to inserts
  supabase
    .channel("tweets")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "tweets" },
      handleInserts
    )
    .subscribe();

  const { data: tweets } = await supabase.from("tweets").select();

  return (
    <div>
      <div>
        {/* <div>Hello {user.email}!</div> */}
        {/* <LogoutButton /> */}
      </div>
      <div>Tweets:</div>
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </div>
  );
}
