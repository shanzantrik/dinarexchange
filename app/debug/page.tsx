'use client'

import { getAuthRedirectUrl, getSiteUrl } from '@/lib/utils'

export default function DebugPage() {
  const siteUrl = getSiteUrl()
  const authRedirectUrl = getAuthRedirectUrl()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">OAuth Debug Information</h1>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <h2 className="font-semibold text-blue-800">Environment Variables:</h2>
            <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
            <p><strong>NEXT_PUBLIC_SITE_URL:</strong> {process.env.NEXT_PUBLIC_SITE_URL || 'Not set'}</p>
            <p><strong>VERCEL_URL:</strong> {process.env.VERCEL_URL || 'Not set'}</p>
          </div>

          <div className="bg-green-50 p-4 rounded">
            <h2 className="font-semibold text-green-800">Generated URLs:</h2>
            <p><strong>Site URL:</strong> {siteUrl}</p>
            <p><strong>Auth Redirect URL:</strong> {authRedirectUrl}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded">
            <h2 className="font-semibold text-yellow-800">Expected OAuth URLs:</h2>
            <p><strong>Google OAuth should have:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>JavaScript origins: {siteUrl}</li>
              <li>Redirect URIs: {authRedirectUrl}</li>
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded">
            <h2 className="font-semibold text-red-800">Supabase Dashboard Settings:</h2>
            <p><strong>Site URL should be:</strong> {siteUrl}</p>
            <p><strong>Google OAuth Redirect URLs should include:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>{authRedirectUrl}</li>
              <li>http://localhost:3000/auth/callback</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Next Steps:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Check the console for debug logs</li>
            <li>Update Google OAuth with the correct redirect URI</li>
            <li>Update Supabase dashboard settings</li>
            <li>Set Vercel environment variable: NEXT_PUBLIC_SITE_URL={siteUrl}</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
