"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/component";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { mutate } from "swr";

const AuthModal = () => {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data?.session ?? null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchSession();
  }, [supabase]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          console.log("User signed in, session:", session);
          onClose();
          mutate("/api/auth");
          router.refresh();
          console.log("page should have refreshed");
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
          setSession(null);
        }
      },
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <>
      <Modal
        title="Plugged-In Music"
        description="Login to your account"
        isOpen={isOpen}
        onChange={onChange}
      >
        <Auth
          supabaseClient={supabase}
          magicLink
          providers={[]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#8962ed",
                  brandAccent: "#8962ed80",
                },
              },
            },
          }}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </Modal>
      <button onClick={() => router.refresh()}>REFRESH</button>
    </>
  );
};

export default AuthModal;
