import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order, status } = body;

    // Status-specific content
    const statusConfig = {
      'processing': {
        title: 'Order Processing',
        color: '#F59E0B',
        message: 'Your order is now being processed and prepared for shipment.',
        details: [
          'We are preparing your currency for shipment',
          'Payment verification is in progress',
          'You will receive shipping confirmation soon'
        ]
      },
      'packaging': {
        title: 'Order Packaging',
        color: '#3B82F6',
        message: 'Your order is being carefully packaged for secure delivery.',
        details: [
          'Your currency is being securely packaged',
          'Quality checks are being performed',
          'Shipping labels are being prepared'
        ]
      },
      'shipped': {
        title: 'Order Shipped',
        color: '#10B981',
        message: 'Your order has been shipped and is on its way to you.',
        details: [
          'Your order has been shipped via registered post',
          'Tracking information is available',
          'Expected delivery: 5-7 business days'
        ]
      },
      'delivered': {
        title: 'Order Delivered',
        color: '#059669',
        message: 'Your order has been successfully delivered.',
        details: [
          'Your currency has been delivered',
          'Please check your package upon receipt',
          'Contact us if you have any questions'
        ]
      },
      'cancelled': {
        title: 'Order Cancelled',
        color: '#DC2626',
        message: 'We regret to inform you that your order has been cancelled.',
        details: [
          'Your order has been cancelled',
          'If payment was made, a refund will be processed',
          'Please contact us if you have any questions'
        ]
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.processing;

    // Email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, ${config.color}, #F97316); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">${config.title}</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Dinar Exchange New Zealand</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">${config.message}</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: ${config.color}; margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> ${order.order_number}</p>
            <p><strong>Currency:</strong> ${order.quantity} Iraqi Dinars</p>
            <p><strong>Total Amount:</strong> $${order.total_amount.toFixed(2)} AUD</p>
            <p><strong>Status:</strong> <span style="color: ${config.color}; font-weight: bold; text-transform: capitalize;">${status}</span></p>
            <p><strong>Updated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid ${config.color};">
            <h3 style="color: ${config.color}; margin-top: 0;">What's Happening Now?</h3>
            <ul style="color: #1e40af;">
              ${config.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
          </div>
          
          ${status === 'shipped' ? `
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #F59E0B;">
            <h3 style="color: #D97706; margin-top: 0;">Shipping Information</h3>
            <p style="color: #92400E;">
              Your order has been shipped via registered post. You can track your package 
              through New Zealand Post. Please allow 5-7 business days for delivery.
            </p>
          </div>
          ` : ''}
          
          ${status === 'delivered' ? `
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10B981;">
            <h3 style="color: #059669; margin-top: 0;">Delivery Confirmation</h3>
            <p style="color: #065f46;">
              Your Iraqi Dinars have been successfully delivered. Please check your package 
              upon receipt and contact us if you have any questions or concerns.
            </p>
          </div>
          ` : ''}
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0;">Questions? Contact us at support@dinarexchange.com.au</p>
          <p style="margin: 10px 0 0 0; font-size: 14px;">Dinar Exchange New Zealand</p>
        </div>
      </div>
    `;

    // Send email to customer using Resend
    const { data: emailData, error: emailError } = await supabase.functions.invoke('resend-email', {
      body: {
        to: order.user_email,
        subject: `${config.title} - ${order.order_number}`,
        html: customerEmailHtml,
        type: 'status-update',
        status: status
      },
    });

    if (emailError) {
      console.error('Status update email error:', emailError);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Status update email error:', error);
    return NextResponse.json({ error: 'Failed to send status update email' }, { status: 500 });
  }
} 