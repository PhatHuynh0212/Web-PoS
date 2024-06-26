import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";
import { SidebarStateProvider } from "@/providers/sidebar-state-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Web PoS System",
    description: "Restyle by Group 1",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={inter.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        disableTransitionOnChange
                    >
                        <ModalProvider>
                            <SidebarStateProvider>
                                {children}
                                <Toaster />
                                <SonnarToaster position="bottom-left" />
                            </SidebarStateProvider>
                        </ModalProvider>
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
