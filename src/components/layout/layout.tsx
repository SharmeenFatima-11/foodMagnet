"use client";
import { usePathname } from "next/navigation";
import LoginLayout from "./loginLayout";
import LayoutApp from "./clientLayout";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutContent>{children}</LayoutContent>;
}

// Separate component to use the context
function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/create-password") ||
    pathname.startsWith("/create-password-confirmation") ||
    pathname.startsWith("/forget-password-confirmation") ||
    pathname.startsWith("/forgot-password");

  return isAuthPage ? (
    <LoginLayout>{children}</LoginLayout>
  ) : (
    <LayoutApp>{children}</LayoutApp>
  );
}
