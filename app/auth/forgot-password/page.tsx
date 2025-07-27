'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ForgotPassword() {
  const [supabase] = useState(() => createClient())
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-orange-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Reset Password
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Enter your email to receive a password reset link
          </motion.p>
        </div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <Auth
            supabaseClient={supabase}
            view="forgotten_password"
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#3B82F6', // primary-500
                    brandAccent: '#1D4ED8', // primary-700
                    brandButtonText: 'white',
                    defaultButtonBackground: '#F97316', // orange-500
                    defaultButtonBackgroundHover: '#EA580C', // orange-600
                    defaultButtonBorder: '1px solid #F97316',
                    defaultButtonText: 'white',
                    dividerBackground: '#E5E7EB',
                    inputBackground: '#F9FAFB',
                    inputBorder: '1px solid #D1D5DB',
                    inputBorderHover: '1px solid #3B82F6',
                    inputBorderFocus: '1px solid #3B82F6',
                    inputLabelText: '#374151',
                    inputPlaceholder: '#9CA3AF',
                    messageText: '#374151',
                    messageTextDanger: '#DC2626',
                    anchorTextColor: '#3B82F6',
                    anchorTextHoverColor: '#1D4ED8',
                  },
                  space: {
                    inputPadding: '12px 16px',
                    buttonPadding: '12px 16px',
                  },
                  fontSizes: {
                    baseBodySize: '14px',
                    baseInputSize: '14px',
                    baseLabelSize: '14px',
                    baseButtonSize: '14px',
                  },
                  fonts: {
                    bodyFontFamily: 'Inter, system-ui, sans-serif',
                    buttonFontFamily: 'Inter, system-ui, sans-serif',
                    inputFontFamily: 'Inter, system-ui, sans-serif',
                    labelFontFamily: 'Inter, system-ui, sans-serif',
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '8px',
                    buttonBorderRadius: '8px',
                    inputBorderRadius: '8px',
                  },
                },
              },
            }}
            redirectTo={`${window.location.origin}/auth/callback`}
          />
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 space-y-2"
        >
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
