import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const POST = async () => {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    return NextResponse.json(
      { message: "Signed out successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error signing out", error);

    if (error instanceof Error) {
      NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
};
