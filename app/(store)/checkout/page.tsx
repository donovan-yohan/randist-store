'use client'

import Cart from '@/components/Cart/Cart'
import { RadioCard } from '@/components/RadioCard/RadioCard'
import { useCart } from '@/lib/contexts/CartContext'
import { sendEmailOptions } from '@/lib/queries/queries'
import { Button, Checkbox, Grid, Paper, Radio, Select, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useLocalStorage } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface CustomerInfo {
    email: string
    phoneNumber: string
    firstName: string
    lastName: string
    address: string
    address2: string
    city: string
    province: string
    postalCode: string
    country: string
    saveInfo: boolean
    paymentMethod?: 'etransfer' | 'cash'
}

const defaultCustomerInfo: CustomerInfo = {
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada',
    saveInfo: false,
    paymentMethod: undefined,
}

export default function CheckoutPage() {
    const { cart, setSubmittedOrder } = useCart()
    const router = useRouter()
    const [savedInfo, setSavedInfo] = useLocalStorage<CustomerInfo>({
        key: 'checkoutInfo',
        defaultValue: { ...defaultCustomerInfo },
    })

    const form = useForm<CustomerInfo>({
        initialValues: { ...savedInfo },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            phoneNumber: (value) =>
                value.trim() === '' || /^\d{10}$/.test(value.replace(/\s/g, ''))
                    ? null
                    : 'Invalid phone number',
            firstName: (value) => (value.trim().length > 0 ? null : 'First name is required'),
            lastName: (value) => (value.trim().length > 0 ? null : 'Last name is required'),
            address: (value) => (value.trim().length > 0 ? null : 'Address is required'),
            city: (value) => (value.trim().length > 0 ? null : 'City is required'),
            province: (value) => (value.trim().length > 0 ? null : 'Province is required'),
            postalCode: (value) => (value.trim().length > 0 ? null : 'Postal Code is required'),
            paymentMethod: (value) => (value ? null : 'Payment method is required'),
        },
    })

    const { mutate: sendEmail, isPending } = useMutation(sendEmailOptions)

    useEffect(() => {
        form.setValues(savedInfo)
    }, [savedInfo])

    return (
        <Grid gutter="xl" align="start">
            <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack mb='xl'>
                    <Title order={3}>Contact</Title>
                    <TextInput
                        label="Email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...form.getInputProps('email')}
                    />
                    <Checkbox
                        label="Save my information for a faster checkout"
                        {...form.getInputProps('saveInfo', { type: 'checkbox' })}
                    />

                    <TextInput
                        label="Phone number (optional)"
                        placeholder="123 456 7890"
                        type="tel"
                        autoComplete="tel"
                        value={form.values.phoneNumber}
                        onChange={(e) => {
                            const raw = e.currentTarget.value.replace(/\D/g, '').slice(0, 10)
                            const formatted = raw
                                .replace(/^(\d{3})(\d)/, '$1 $2')
                                .replace(/^(\d{3}) (\d{3})(\d)/, '$1 $2 $3')
                            form.setFieldValue('phoneNumber', formatted)
                        }}
                        error={form.errors.phoneNumber}
                    />

                    <Title order={3} mt="lg">Billing address</Title>
                    <Select
                        label="Country/Region"
                        data={['Canada']}
                        placeholder="Select country"
                        autoComplete="country"
                        {...form.getInputProps('country')}
                        disabled
                    />
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput
                                label="First name"
                                placeholder="John"
                                autoComplete="given-name"
                                {...form.getInputProps('firstName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Last name"
                                placeholder="Doe"
                                autoComplete="family-name"
                                {...form.getInputProps('lastName')}
                            />
                        </Grid.Col>
                    </Grid>
                    <TextInput
                        label="Address"
                        placeholder="123 Main St"
                        autoComplete="address-line1"
                        {...form.getInputProps('address')}
                    />
                    <TextInput
                        label="Apartment, suite, etc. (optional)"
                        placeholder="Apartment, suite, etc."
                        autoComplete="address-line2"
                        {...form.getInputProps('address2')}
                    />
                    <Grid>
                        <Grid.Col span={4}>
                            <TextInput
                                label="City"
                                placeholder="Toronto"
                                autoComplete="address-level2"
                                {...form.getInputProps('city')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Select
                                label="Province"
                                data={[
                                    'Ontario',
                                    'Quebec',
                                    'Alberta',
                                    'British Columbia',
                                    'Manitoba',
                                    'New Brunswick',
                                    'Newfoundland and Labrador',
                                    'Nova Scotia',
                                    'Prince Edward Island',
                                    'Saskatchewan',
                                    'Northwest Territories',
                                    'Nunavut',
                                    'Yukon'
                                ]}
                                placeholder="Select province"
                                autoComplete="address-level1"
                                {...form.getInputProps('province')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Postal Code"
                                placeholder="A1A 1A1"
                                autoComplete="postal-code"
                                value={form.values.postalCode}
                                onChange={(e) => {
                                    const raw = e.currentTarget.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6)
                                    const formatted = raw.length > 3 ? `${raw.slice(0, 3)} ${raw.slice(3)}` : raw
                                    form.setFieldValue('postalCode', formatted)
                                }}
                                error={form.errors.postalCode}
                            />
                        </Grid.Col>
                    </Grid>

                    <Title order={3} mt="lg">Payment method</Title>
                    <Radio.Group
                        value={form.values.paymentMethod}
                        name="paymentMethod"
                        {...form.getInputProps('paymentMethod')}
                    >
                        <Stack>
                            <RadioCard
                                value='etransfer'
                                label='E-Transfer'
                                description={<>E-transfer the amount on this invoice to <b>rd@randist.com</b> upon delivery</>}
                                selected={form.values.paymentMethod === 'etransfer'}
                            />
                            <RadioCard
                                value='cash'
                                label='Cash'
                                description='Bring the amount on this invoice in cash to exchange on delivery'
                                selected={form.values.paymentMethod === 'cash'}
                            />
                        </Stack>
                    </Radio.Group>

                    <Button
                        mt="md"
                        onClick={() => {
                            form.onSubmit((values) => {
                                sendEmail({
                                    ...values,
                                    paymentMethod: values.paymentMethod || 'etransfer',
                                    items: cart
                                }, {
                                    onSuccess: () => {
                                        setSubmittedOrder(true)
                                        router.push('/checkout/confirmed')
                                    }
                                })
                                if (values.saveInfo) {
                                    setSavedInfo(values)
                                } else {
                                    setSavedInfo({ ...defaultCustomerInfo })
                                }
                            })()
                        }}
                        loading={isPending}
                    >
                        Submit Order
                    </Button>
                </Stack>
            </Grid.Col >

            <Grid.Col span={{ base: 12, md: 5 }}>
                <Paper withBorder p="md">
                    <Cart hideCheckoutButton />
                </Paper>
            </Grid.Col>
        </Grid >
    )
}
