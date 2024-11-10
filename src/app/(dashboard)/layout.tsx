
import React from "react";
import "../globals.css";
import RootSidebar from "@/components/layout/sidebar/root-sidebar";
import {SidebarProvider} from "@/components/ui/sidebar";
import {ThemeProvider} from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";

export default function DashboardLayout({children}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <SidebarProvider>
                <RootSidebar />
                <main className={"flex flex-col w-full"}>
                    <Navbar />
                    <div className={""}>
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </ThemeProvider>
    );
}
