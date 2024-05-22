import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return NextResponse.json(
        { error: "Authentication failed. Please log in." },
        { status: 401 },
      );
    }

    return NextResponse.json({ user: userData.user }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);

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
