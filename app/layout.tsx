// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KOINITY — Official Membership Access",
  description: "Official landing page for KOINITY membership access via Telegram bot.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
