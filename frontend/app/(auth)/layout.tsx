import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Authentication section"
};

export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full bg-[#ffffff] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[500px] p-8">
        {children}
      </div>
    </main>
  );
}