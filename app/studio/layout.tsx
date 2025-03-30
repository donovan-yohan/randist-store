export const metadata = {
  title: 'Randist Product Editor',
  description: 'Edit your products and variants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
