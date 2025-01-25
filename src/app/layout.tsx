import type { Metadata } from "next";
import { AuthProvider } from "../context/auth-provider";
import "./globals.css";
import ThemeProvider from "../lib/theme-provider";
import { cookies } from "next/headers";
import I18nextProvider from "../lib/i18next-provider";
import { CssBaseline } from "@mui/material";

interface RootLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: { default: 'ACCthis', template: 'Temops' },
};


export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
	const cookieStore = await cookies();
    const currentLanguage = cookieStore.get('i18next')?.value;

  return (
    <html lang="en">
      <body>
		<AuthProvider>
			<I18nextProvider lng={currentLanguage}>
			<ThemeProvider>
				<CssBaseline/>
        	{children}
			</ThemeProvider>
			</I18nextProvider>
		</AuthProvider>
      </body>
    </html>
  );
}
