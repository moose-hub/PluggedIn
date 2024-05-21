import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: "Auth session missing!" },
        { status: 401 },
      );
    }

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(error.message);
    }
    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred." },
        { status: 500 },
      );
    }
  }
}
