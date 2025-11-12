"use client";
import LoginLeft from "../loginLeft/loginLeft";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutContent>{children}</LayoutContent>;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen text-[#000000]">
      {/* Left side - hidden on small screens */}
      <div className="hidden md:flex flex-1">
        <LoginLeft />
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col items-center bg-gray-50 p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
