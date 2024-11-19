
"use client"

import {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { useState } from 'react'

interface TanStackProviderProps {
    readonly children: ReactNode
}

export default function TanstackProviders({children}: TanStackProviderProps){

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
                refetchOnWindowFocus: false,
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )


}