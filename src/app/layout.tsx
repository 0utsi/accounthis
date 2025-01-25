import type { Metadata } from "next";
import { AuthProvider } from "../context/auth-provider";
import "./globals.css";

interface RootLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: { default: 'ACCthis', template: 'Temops' },
};


export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>
		<AuthProvider>
        	{children}
		</AuthProvider>
      </body>
    </html>
  );
}
