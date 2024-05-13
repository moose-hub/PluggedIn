import { createClient } from "@/utils/supabase/server";
import UploadForm from "./UploadPanel/UploadForm";

export default async function UploadPanel() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <h1>YOU NEED TO LOGIN</h1>;
  }
  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload your song</h2>
      <UploadForm />
    </div>
  );
}
