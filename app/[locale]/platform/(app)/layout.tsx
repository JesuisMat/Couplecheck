import { Sidebar } from "@/components/platform/Sidebar";
import { PlatformHeader } from "@/components/platform/PlatformHeader";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden lg:flex h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile header (hamburger) */}
      <PlatformHeader />

      {/* Main content */}
      <main className="flex-1 min-w-0 lg:pt-0 pt-14">
        {children}
      </main>
    </div>
  );
}
