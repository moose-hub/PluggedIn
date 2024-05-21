import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/component";
import { Database } from "@/types_db";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const supabase = createClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json({ error: "Missing user UUID" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", uuid);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ songs: data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json(
      { error: `Error fetching songs: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
