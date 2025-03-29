'use client'

import Cart from '@/components/Cart/Cart'
import { Button, Checkbox, Grid, Paper, Select, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function CheckoutPage() {
    const form = useForm({
        initialValues: {
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
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            phoneNumber: (value) =>
                value.trim() === '' || /^\d{10}$/.test(value.replace(/\s/g, ''))
                    ? null
                    : 'Invalid phone number',
            lastName: (value) => (value.trim().length > 0 ? null : 'Last name is required'),
            address: (value) => (value.trim().length > 0 ? null : 'Address is required'),
            city: (value) => (value.trim().length > 0 ? null : 'City is required'),
            province: (value) => (value.trim().length > 0 ? null : 'Province is required'),
            postalCode: (value) => (value.trim().length > 0 ? null : 'Postal Code is required'),
        },
    })

    return (
        <Grid gutter="xl" align="start">
            <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack>
                    <Title order={3}>Contact</Title>
                    <TextInput
                        label="Email"
                        placeholder="you@example.com"
                        {...form.getInputProps('email')}
                    />
                    <Checkbox
                        label="Email me with news and offers"
                        {...form.getInputProps('saveInfo', { type: 'checkbox' })}
                    />

                    <TextInput
                        label="Phone number (optional)"
                        placeholder="123 456 7890"
                        type="tel"
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
                        {...form.getInputProps('country')}
                        disabled
                    />
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput
                                label="First name (optional)"
                                placeholder="John"
                                {...form.getInputProps('firstName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Last name"
                                placeholder="Doe"
                                {...form.getInputProps('lastName')}
                            />
                        </Grid.Col>
                    </Grid>
                    <TextInput
                        label="Address"
                        placeholder="123 Main St"
                        {...form.getInputProps('address')}
                    />
                    <TextInput
                        label="Apartment, suite, etc. (optional)"
                        placeholder="Apartment, suite, etc."
                        {...form.getInputProps('address2')}
                    />
                    <Grid>
                        <Grid.Col span={4}>
                            <TextInput
                                label="City"
                                placeholder="Toronto"
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
                                {...form.getInputProps('province')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Postal Code"
                                placeholder="A1A 1A1"
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

                    <Button
                        mt="md"
                        onClick={() => {
                            form.onSubmit((values) => { console.log(values) })()
                            // TODO: handle form submission
                        }}
                    >
                        Review Order
                    </Button>
                </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
                <Paper withBorder p="md">
                    <Cart hideCheckoutButton />
                </Paper>
            </Grid.Col>
        </Grid>
    )
}
