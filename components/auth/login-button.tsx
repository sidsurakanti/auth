"use client";

import { useRouter } from "next/navigation"

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    console.log("Login button clicked.");
    router.push("/auth/login")
  };

  if (mode == "modal") {
    return <span>Implement modal</span>
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
}
