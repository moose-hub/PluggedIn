import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/component";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";
import useAuthModal from "@/hooks/useAuthModel";

type SessionState = {
  session: Session | null;
};

const AuthModal = () => {
  const supabase = createClient();
  const [session, setSession] = useState<SessionState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          // For generic errors
          setError(error.message);
        } else {
          // For unknown errors
          setError("An unknown error occurred");
        }
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <>
      <Modal
        title="Welcome Back"
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
      </Modal>
    </>
  );
};

export default AuthModal;
