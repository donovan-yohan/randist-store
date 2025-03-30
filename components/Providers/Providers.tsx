"use client"

import { CartProvider } from '@/lib/contexts/CartContext'
import { theme } from '@/theme'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider defaultColorScheme='light' theme={theme}>
                <CartProvider>
                    <Notifications />
                    {children}
                </CartProvider>
            </MantineProvider>
            {/* <ReactQueryDevtools buttonPosition='top-right' /> */}
        </QueryClientProvider>
    )
}

export default Providers