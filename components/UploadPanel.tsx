import { createClient } from "@/utils/supabase/server";
import * as tus from "tus-js-client";
import { UploadDataTypes } from "@/models/interfaces/uploadPanel";
import UploadForm from "./UploadPanel/UploadForm";

const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;

if (!projectId) {
  throw new Error("Missing env var NEXT_PUBLIC_SUPABASE_PROJECT_ID");

  console.error("projectId", projectId);
}

export default async function UploadPanel() {
  const supabase = createClient();

  const handleUpload = async (
    bucketName: string,
    uploadData: UploadDataTypes,
  ) => {
    "use server";
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const uploadPromises = [];

    console.log(session);

    console.log("starting audio upload");
    const audioUpload = new tus.Upload(uploadData.audioFile, {
      endpoint: `https://${projectId}.supabase.co/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${session?.access_token}`,
      },
      metadata: {
        bucketName: bucketName,
        objectName: uploadData.audioFile.name,
        contentType: uploadData.audioFile.type,
        cacheControl: "3600",
        songName: uploadData.songName,
      },
      onError: (error) => {
        console.log("Failed because: " + error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
      },
      onSuccess: () => {
        console.log("Audio upload successful");
      },
    });
    console.log("audio uploaded");

    console.log("starting album art upload");
    const albumArtUpload = new tus.Upload(uploadData.albumArt, {
      endpoint: `https://${projectId}.supabase.co/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorisation: `Bearer ${session?.access_token}`,
      },
      metadata: {
        bucketName: bucketName,
        objectName: uploadData.albumArt.name,
        contentType: uploadData.albumArt.type,
        cacheControl: "3600",
        songName: uploadData.songName,
      },
      onError: (error) => {
        console.log("Failed because: " + error);
        return error;
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
      },
      onSuccess: () => {
        console.log("Album art upload successful");
      },
    });

    uploadPromises.push(audioUpload.start());
    uploadPromises.push(albumArtUpload.start());

    await Promise.all(uploadPromises);
  };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <h1>YOU NEED TO LOGIN</h1>;
  }
  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload your song</h2>
      <UploadForm handleUpload={handleUpload} />
    </div>
  );
}
