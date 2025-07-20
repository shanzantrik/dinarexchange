// Email validation function
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Format currency for display
export function formatCurrency(amount: number, currency: string = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Format order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `DINAR-${timestamp.slice(-6)}-${random}`;
}

// Sanitize form data for email
export function sanitizeFormData(formData: any): any {
  const sanitized = { ...formData };

  // Remove sensitive fields that shouldn't be in email
  delete sanitized.driversLicenseNumber;
  delete sanitized.passportNumber;
  delete sanitized.otherGovernmentId;

  return sanitized;
}
