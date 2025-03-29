import { useCart } from "@/lib/contexts/CartContext"
import { ActionIcon, Button, Divider, Group, Image, NumberFormatter, Space, Stack, Text, Anchor } from "@mantine/core"
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/navigation";

interface CartProps {
    hideCheckoutButton?: boolean
}
const Cart: React.FC<CartProps> = (props) => {
    const { cart, removeFromCart, addQuantity, removeQuantity } = useCart()
    const router = useRouter();

    if (cart.length === 0) { return <Text>Your cart is empty.</Text> }
    return (
        <Stack>
            {cart.map(cartItem => {
                return (
                    <Stack key={`${cartItem.productId}-${cartItem.optionId}-${cartItem.size}`} gap="xs">
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
                                <Group>
                                    <ActionIcon size="sm" variant="light" onClick={() => removeQuantity({ ...cartItem })} disabled={cartItem.quantity === 0}>
                                        <IconMinus size={14} />
                                    </ActionIcon>
                                    <Text size="sm">{cartItem.quantity}</Text>
                                    <ActionIcon size="sm" variant="light" onClick={() => addQuantity({ ...cartItem })}>
                                        <IconPlus size={14} />
                                    </ActionIcon>
                                </Group>
                                <Text size="sm" c="dimmed">{cartItem?.option}</Text>
                                <Text size="sm" c="dimmed">{cartItem?.size}</Text>
                                <Text size="sm" c="dimmed"><NumberFormatter value={cartItem.price} decimalScale={2} thousandSeparator prefix="$" /></Text>
                                <Space h={4} />
                                <Text size="md" c="dimmed">Subtotal: <NumberFormatter value={cartItem.price * cartItem.quantity} decimalScale={2} thousandSeparator prefix="$" /></Text>
                                <ActionIcon
                                    color="red"
                                    variant="light"
                                    size="sm"
                                    onClick={() => removeFromCart({ ...cartItem })}
                                >
                                    <IconTrash size={16} />
                                </ActionIcon>
                            </Stack>
                        </Group>
                        <Divider />
                    </Stack >
                )
            })}
            <Divider />
            <Group justify="space-between">
                <Text fw={500}>Total</Text>
                <Text fw={500}>
                    <NumberFormatter
                        value={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
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