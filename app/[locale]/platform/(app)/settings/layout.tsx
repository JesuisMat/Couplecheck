import { SettingsNav } from "@/components/platform/settings/SettingsNav";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="flex gap-8">
        {/* Secondary nav */}
        <aside className="w-[200px] flex-shrink-0 hidden md:block">
          <SettingsNav />
        </aside>

        {/* Mobile nav — horizontal scroll */}
        <div className="md:hidden w-full mb-6">
          <div className="overflow-x-auto">
            <SettingsNav />
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 min-w-0 bg-white rounded-[12px] border border-[var(--border)] p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
