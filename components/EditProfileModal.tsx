"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { createClient } from "@/utils/supabase/component";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import useEditProfileModal from "@/stores/useEditProfileModal";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const supabase = createClient();

const EditProfileModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, error, signOut } = useAuth();
  const editProfileModal = useEditProfileModal();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      description: "",
      avatar: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      editProfileModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const avatarFile = values.avatar?.[0];

      if (!avatarFile || !user) {
        throw new Error("Missing required fields");
      }

      const uniqueID = uuidv4();

      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(`image-${values.username}-${uniqueID}.jpg`, avatarFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        throw new Error("Error uploading image file");
      }

      const { error: supabaseError } = await supabase
        .from("users")
        .update({
          username: values.username,
          description: values.description,
          avatar_url: imageData.path,
        })
        .eq("id", user.id);

      if (supabaseError) {
        setIsLoading(false);
        throw new Error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Upload Success");
      reset();
      editProfileModal.onClose();
    } catch (error) {
      console.log("something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit your Profile"
      description="Update your profile information and avatar"
      isOpen={editProfileModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
            flex flex-col gap-y-4
        "
      >
        <div>
          <div className="pb-1">Set a Username / Alias</div>
          <Input
            id="username"
            disabled={isLoading}
            {...register("username", { required: true })}
            placeholder="Username"
          />
        </div>
        <div>
          <div className="pb-1">Tell us something about yourself</div>
          <Input
            id="description"
            disabled={isLoading}
            {...register("description", { required: true })}
            placeholder="Profile Description"
            type="longtext"
          />
        </div>
        <div>
          <div className="pb-1">Select an Image File</div>
          <Input
            id="avatar"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("avatar", { required: true })}
            placeholder="Avatar File"
            className="border-dashed"
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Save Changes
        </Button>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
