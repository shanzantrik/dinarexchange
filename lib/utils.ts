export function getSiteUrl() {
  // Check if we're in production
  if (process.env.NODE_ENV === 'production') {
    // Use environment variable if set, otherwise try to detect from Vercel
    return process.env.NEXT_PUBLIC_SITE_URL || 
           process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
           'https://dinarexchange.com.au' // fallback to your domain
  }
  
  // Development
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

export function getAuthRedirectUrl() {
  const siteUrl = getSiteUrl()
  return `${siteUrl}/auth/callback`
} 