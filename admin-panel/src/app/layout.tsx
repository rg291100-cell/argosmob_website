export const metadata = {
  title: 'ArgosMob | Admin Panel',
  description: 'Manage your portfolio, services, and enquiries.',
  icons: {
    icon: "/images/logo.png",
  },
}

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
