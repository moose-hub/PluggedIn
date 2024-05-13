"use client";

import useAuthModal from "@/hooks/useAuthModel";

const LoginTest = () => {
  const authModal = useAuthModal();
  return (
    <>
      <button onClick={authModal.onOpen}>Login</button>
      <button onClick={authModal.onOpen}>Sign Up</button>
    </>
  );
};

export default LoginTest;
