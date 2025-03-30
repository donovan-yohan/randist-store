import * as React from 'react'
import { CartItem } from '../contexts/CartContext'

export interface InvoiceEmailProps {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    address: string
    address2?: string
    city: string
    province: string
    postalCode: string
    country: string
    paymentMethod: 'etransfer' | 'cash'
    items: CartItem[]
}

interface InvoiceEmailInternalProps extends InvoiceEmailProps {
    invoiceNumber: string
}

export const InvoiceEmail: React.FC<Readonly<InvoiceEmailInternalProps>> = ({
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    address2,
    city,
    province,
    postalCode,
    country,
    paymentMethod,
    items,
    invoiceNumber,
}) => {
    const fullName = `${firstName} ${lastName}`.trim()
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
            <h1>Thank you for choosing Randist, {firstName || lastName}!</h1>

            <h2>Customer Information</h2>
            <p><strong>Name:</strong> {fullName}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phoneNumber || 'N/A'}</p>
            <p><strong>Address:</strong> {address}{address2 ? `, ${address2}` : ''}, {city}, {province}, {postalCode}, {country}</p>

            <h2>Order Summary: {invoiceNumber}</h2>

            <p><strong>Order Placed On:</strong> {new Date().toLocaleDateString('en-CA')}</p>

            <table width="100%" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th align="left">Preview</th>
                        <th align="left">Item</th>
                        <th align="left">Option</th>
                        <th align="left">Size</th>
                        <th align="right">Qty</th>
                        <th align="right">Price</th>
                        <th align="right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={i}>
                            <td><img src={item.imageUrl} alt={item.name} style={{ height: '40px' }} /></td>
                            <td>{item.name}</td>
                            <td>{item.option}</td>
                            <td>{item.size}</td>
                            <td align="right">{item.quantity}</td>
                            <td align="right">${(item.price).toFixed(2)}</td>
                            <td align="right">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6} align="right" style={{ fontWeight: 'bold', fontSize: '16px' }}>Total:</td>
                        <td align="right" style={{ fontWeight: 'bold', fontSize: '16px' }}>${total.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
            <p><strong>Payment Method:</strong> {paymentMethod === 'etransfer' ? 'E-Transfer' : 'Cash'}</p>
            {paymentMethod === 'etransfer' && (
                <p>The email for e-transfer is <a href='mailto:rd@randist.com'>rd@randist.com</a></p>
            )}
        </div >
    )
}