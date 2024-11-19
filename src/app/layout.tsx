
import React from "react";
import type {Metadata} from "next";
import "./globals.css";
import {cn} from "@/lib/utils";
import {inter} from "@/lib/fonts";
import {ConvexClientProvider} from "@/lib/providers/convex-client-provider";
import {Toaster} from "sonner";
import {ThemeProvider} from "@/lib/providers/theme-provider";

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
                    <ConvexClientProvider>
                        <main className={"flex flex-col w-full"}>
                            {children}
                        </main>
                    </ConvexClientProvider>
                    <Toaster position="top-center" expand={true} richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}
