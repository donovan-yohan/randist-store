"use client"

import { CartProvider } from '@/lib/contexts/CartContext'
import { theme } from '@/theme'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { PropsWithChildren } from 'react'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme}>
                <CartProvider>
                    <Notifications />
                    {children}
                </CartProvider>
            </MantineProvider>
            <ReactQueryDevtools buttonPosition='top-left' />
        </QueryClientProvider>
    )
}

export default Providers