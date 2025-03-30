'use client'

import Cart from "@/components/Cart/Cart"
import { useCart } from "@/lib/contexts/CartContext"
import { Grid, Paper, Stack, Text, Title } from "@mantine/core"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CheckoutConfirmedPage() {
    const { clearCart, setSubmittedOrder, submittedOrder, cart } = useCart()
    const [cartLocal, setCartLocal] = useState(cart)

    const router = useRouter()

    useEffect(() => {
        if (!submittedOrder) {
            router.replace('/')
            return
        }

        setCartLocal(cart)
        clearCart()
        return () => {
            if (submittedOrder) {
                setSubmittedOrder(false)
            }
        }
    }, [])

    return (
        <Grid gutter="xl" align="start">
            <Grid.Col span={{ base: 12, md: 7 }} h='100%'>
                <Stack>
                    <Title order={3}>Thank you for your order!</Title>
                    <Title order={5}>Your order has been confirmed and is being processed.</Title>
                    <Title order={5}>You will receive an email confirmation shortly.</Title>
                    <Text>We will reach out to you to organize pickup or shipping and receiving payment.</Text>
                </Stack>
            </Grid.Col >

            <Grid.Col span={{ base: 12, md: 5 }}>
                <Paper withBorder p="md">
                    <Cart cartLocalOverride={cartLocal} hideCheckoutButton readOnly />
                </Paper>
            </Grid.Col>
        </Grid>
    )
}