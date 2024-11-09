
import React from "react";
import type {Metadata} from "next";
import "./globals.css";
import {cn} from "@/lib/utils";
import {inter} from "@/lib/fonts";
import RootSidebar from "@/components/layout/sidebar/root-sidebar";
import {SidebarProvider} from "@/components/ui/sidebar";
import {ThemeProvider} from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";

export const metadata: Metadata = {
    title: "wispyr",
    description: "your personal and secure chat app",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("antialiased", inter.className)}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <SidebarProvider>
                        <RootSidebar />
                        <main className={"w-full px-4 py-3"}>
                            <Navbar />
                            {children}
                        </main>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
