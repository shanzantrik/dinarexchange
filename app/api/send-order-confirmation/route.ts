import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order, customerInfo, selectedOption } = body;

    // Email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3B82F6, #F97316); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Order Confirmation</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Dinar Exchange New Zealand</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Thank you for your order!</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #3B82F6; margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> ${order.order_number}</p>
            <p><strong>Currency:</strong> ${selectedOption.quantity} Iraqi Dinars</p>
            <p><strong>Total Amount:</strong> $${order.total_amount.toFixed(2)} AUD</p>
            <p><strong>Status:</strong> <span style="color: #F97316; font-weight: bold;">Pending</span></p>
            <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #3B82F6; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${customerInfo.fullName}</p>
            <p><strong>Email:</strong> ${customerInfo.email}</p>
            <p><strong>Phone:</strong> ${customerInfo.phone}</p>
            <p><strong>Address:</strong> ${customerInfo.address}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #10B981;">
            <h3 style="color: #059669; margin-top: 0;">What's Next?</h3>
            <ul style="color: #065f46;">
              <li>We'll process your order within 24 hours</li>
              <li>You'll receive payment instructions via email</li>
              <li>Once payment is confirmed, your order will be shipped</li>
              <li>You'll receive tracking information when shipped</li>
            </ul>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #F59E0B;">
            <h3 style="color: #D97706; margin-top: 0;">Important Information</h3>
            <ul style="color: #92400E;">
              <li>Payment is accepted in AUD only</li>
              <li>Bank transfer details will be provided</li>
              <li>Shipping takes 5-7 business days</li>
              <li>All orders are shipped via registered post</li>
            </ul>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0;">Questions? Contact us at support@dinarexchange.com.au</p>
          <p style="margin: 10px 0 0 0; font-size: 14px;">Dinar Exchange New Zealand</p>
        </div>
      </div>
    `;

    // Send email to customer using Resend
    const { data: customerEmailData, error: customerEmailError } = await supabase.functions.invoke('resend-email', {
      body: {
        to: customerInfo.email,
        subject: `Order Confirmation - ${order.order_number}`,
        html: customerEmailHtml,
        type: 'order-confirmation'
      },
    });

    if (customerEmailError) {
      console.error('Customer email error:', customerEmailError);
    }

    // Email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #DC2626, #F97316); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">New Order Received</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Dinar Exchange New Zealand</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">New order has been placed!</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #DC2626; margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> ${order.order_number}</p>
            <p><strong>Customer:</strong> ${customerInfo.fullName}</p>
            <p><strong>Email:</strong> ${customerInfo.email}</p>
            <p><strong>Phone:</strong> ${customerInfo.phone}</p>
            <p><strong>Currency:</strong> ${selectedOption.quantity} Iraqi Dinars</p>
            <p><strong>Total Amount:</strong> $${order.total_amount.toFixed(2)} AUD</p>
            <p><strong>Payment Method:</strong> ${order.payment_method}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h3 style="color: #DC2626; margin-top: 0;">Customer Address</h3>
            <p>${customerInfo.address}</p>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0;">Login to admin dashboard to process this order</p>
        </div>
      </div>
    `;

    // Send email to admin using Resend
    const { data: adminEmailData, error: adminEmailError } = await supabase.functions.invoke('resend-email', {
      body: {
        to: process.env.ADMIN_EMAIL || 'admin@dinarexchange.com.au',
        subject: `New Order - ${order.order_number}`,
        html: adminEmailHtml,
        type: 'admin-notification'
      },
    });

    if (adminEmailError) {
      console.error('Admin email error:', adminEmailError);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 