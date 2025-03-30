import { Resend } from 'resend';
import { InvoiceEmail, InvoiceEmailProps } from '@/lib/emails/InvoiceEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // TODO: add validation
    const body = (await req.json()) as InvoiceEmailProps;
    const {
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
      items,
    } = body;

    const invoiceNumber = `RD-${Date.now().toString(36).toUpperCase()}`;
    const { data, error } = await resend.emails.send({
      from: 'Randist <info@invoices.randist.com>',
      to: [email],
      bcc: ['rd@randist.com'],
      subject: `Randist Order Confirmation - ${invoiceNumber}`,
      // @ts-expect-error - Resend React Email typing limitation
      react: InvoiceEmail({
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
        items,
        invoiceNumber,
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Handler error:', error);
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
