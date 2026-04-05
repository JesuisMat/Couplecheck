// Minimal layout for /platform — applies to login, register, onboarding
// The (app) sub-group adds the sidebar layout on top for authenticated pages
export default function PlatformRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
