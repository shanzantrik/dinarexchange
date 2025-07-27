import './globals.css'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AuthProvider } from '../contexts/AuthContext'

export const metadata = {
  title: 'Dinar Exchange New Zealand',
  description: 'Trusted Iraqi Dinar & Zimbabwe Dollar Exchange in New Zealand'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
