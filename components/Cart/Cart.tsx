import { CartItem, useCart } from "@/lib/contexts/CartContext"
import { ActionIcon, Anchor, Button, Divider, Group, Image, NumberFormatter, Space, Stack, Text } from "@mantine/core"
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CartProps {
    hideCheckoutButton?: boolean
    readOnly?: boolean
    cartLocalOverride?: CartItem[]
}
const Cart: React.FC<CartProps> = (props) => {
    const { cart, removeFromCart, addQuantity, removeQuantity } = useCart()
    const router = useRouter()

    const cartItems = props.cartLocalOverride || cart

    if (cartItems.length === 0) { return <Text>Your cart is empty.</Text> }
    return (
        <Stack>
            {cartItems.map(cartItem => {
                return (
                    <Stack key={`${cartItem.productId}-${cartItem.optionId}-${cartItem.size}`} gap="xs">
                        <Group justify="space-between">
                            <Group>
                                <Image
                                    src={cartItem.imageUrl}
                                    w={60}
                                    h={60}
                                    radius="md"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => router.push(`/product/${cartItem.productId}`)}
                                />
                                <Stack gap={0}>
                                    <Anchor fw={500} onClick={() => router.push(`/product/${cartItem.productId}`)} style={{ cursor: 'pointer' }}>
                                        {cartItem.name}
                                    </Anchor>
                                    {!props.readOnly ? (
                                        <Group>
                                            <ActionIcon size="sm" variant="light" onClick={() => removeQuantity({ ...cartItem })} disabled={cartItem.quantity === 0}>
                                                <IconMinus size={14} />
                                            </ActionIcon>
                                            <Text size="sm">{cartItem.quantity}</Text>
                                            <ActionIcon size="sm" variant="light" onClick={() => addQuantity({ ...cartItem })}>
                                                <IconPlus size={14} />
                                            </ActionIcon>
                                        </Group>
                                    ) : (
                                        <Text size="sm">Qty: {cartItem.quantity}</Text>
                                    )}
                                    <Text size="sm" c="dimmed">{cartItem?.option}</Text>
                                    <Text size="sm" c="dimmed">{cartItem?.size}</Text>
                                </Stack>
                            </Group>
                            <Stack gap={0} align='flex-end'>
                                <Text size="sm" c="dimmed"><NumberFormatter value={cartItem.price} decimalScale={2} thousandSeparator prefix="$" /></Text>
                                <Space h={4} />
                                <Text size="md" c="dimmed">Subtotal: <NumberFormatter value={cartItem.price * cartItem.quantity} decimalScale={2} thousandSeparator prefix="$" /></Text>
                                {!props.readOnly && (
                                    <ActionIcon
                                        color="red"
                                        variant="light"
                                        size="sm"
                                        onClick={() => removeFromCart({ ...cartItem })}
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                )}
                            </Stack>
                        </Group>
                        <Divider />
                    </Stack >
                )
            })}
            <Divider />
            <Group justify="space-between">
                <Text fw={500}>Total {cartItems.reduce((acc, cur) => acc + cur.quantity, 0)} items</Text>
                <Text fw={500}>
                    <NumberFormatter
                        value={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                        decimalScale={2}
                        thousandSeparator
                        prefix="$"
                    />
                </Text>
            </Group>

            {!props.hideCheckoutButton && <Link href="/checkout" style={{ textDecoration: 'none' }} >
                <Button fullWidth mt="sm" radius="md" variant="filled">
                    Checkout
                </Button>
            </Link>}

        </Stack >
    )
}

export default Cart