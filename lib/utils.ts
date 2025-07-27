export function getSiteUrl() {
  // Check if we're in production
  if (process.env.NODE_ENV === 'production') {
    // Use environment variable if set, otherwise try to detect from Vercel
    return process.env.NEXT_PUBLIC_SITE_URL ||
           process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
           'https://dinarexchangeau.vercel.app' // fallback to your Vercel domain
  }

  // Development
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

export function getAuthRedirectUrl() {
  const siteUrl = getSiteUrl()
  return `${siteUrl}/auth/callback`
}
