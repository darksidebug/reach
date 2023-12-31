import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Reach',
  description: 'Your 3 in 1, app solution for your project.',
}

export default function RootLayout(
  {children,}: 
  {children: React.ReactNode}
) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
