
import React from "react";
import type {Metadata} from "next";
import "./globals.css";
import {cn} from "@/lib/utils";
import {inter} from "@/lib/fonts";
export const metadata: Metadata = {
    title: "wispyr",
    description: "your personal and secure chat app",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("antialiased", inter.className)}>
                <main className={"flex flex-col w-full"}>
                    {children}
                </main>
            </body>
        </html>
    );
}
