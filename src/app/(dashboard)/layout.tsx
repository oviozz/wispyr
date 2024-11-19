
import {ReactNode} from "react";
import "../globals.css";
import RootSidebar from "@/components/layout/sidebar/root-sidebar";
import {SidebarProvider} from "@/components/ui/sidebar";
import Navbar from "@/components/layout/navbar";
import TanstackProviders from "@/lib/providers/tanstack-providers";
import {verifySession} from "@/app/(auth)/_actions/session";
import LoggedUserProvider from "@/lib/providers/loggeduser-provider";
import {Id} from "../../../convex/_generated/dataModel";
import {redirect} from "next/navigation";

interface DashboardLayoutProps {
    readonly children: ReactNode
}
export default async function DashboardLayout({children}: DashboardLayoutProps) {

    const session = await verifySession();
    const userId = session?.userId as Id<"users"> | null

    if (!userId){
        redirect("/");
    }

    return (
        <TanstackProviders>
            <LoggedUserProvider userId={userId}>
                <SidebarProvider>
                    <div className={"flex h-screen w-full"}>
                        <RootSidebar />
                        <div className={"flex flex-col w-full"}>
                            <Navbar />
                            <div className={"overflow-hidden"}>
                                {children}
                            </div>
                        </div>
                    </div>
                </SidebarProvider>
            </LoggedUserProvider>
        </TanstackProviders>
    );
}
