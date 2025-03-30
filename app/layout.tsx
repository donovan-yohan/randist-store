import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import Providers from '@/components/Providers/Providers'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'

export const metadata = {
  title: 'Randist Custom Printing',
  description: 'Custom apparel, accessories, and more. Contact us if you have a design in mind!',
}

export default function RootLayout({ children }: { children: any }) {

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
