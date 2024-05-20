import { NextRequest, NextResponse } from "next/server";
import useCurrentSong from "@/stores/useCurrentSong";

export async function GET(request: NextRequest) {
  const currentSong = useCurrentSong.getState().currentSong;
  return NextResponse.json(currentSong, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const song = body.song;
    console.log(useCurrentSong.getState().currentSong);
    useCurrentSong.getState().setCurrentSong(song);
    console.log(useCurrentSong.getState().currentSong);
    return NextResponse.json(song, { status: 200 });
  } catch (error) {
    console.error("Error updating current song:", error);
    return NextResponse.json(
      { error: `Error updating current song: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
