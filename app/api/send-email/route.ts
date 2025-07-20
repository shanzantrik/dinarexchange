import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { isValidEmail, generateOrderNumber, sanitizeFormData } from '@/lib/emailUtils';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      formData,
      selectedOption,
      totalAmount,
      currencyType
    } = body;

    // Validate required fields
    if (!formData.email || !formData.firstName || !formData.lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Sanitize form data for email
    const sanitizedFormData = sanitizeFormData(formData);

    // Create email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e40af 0%, #f97316 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Order Confirmation</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Dinar Exchange - ${currencyType}</p>
        </div>

        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-top: 0;">Thank you for your order!</h2>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Currency:</strong> ${selectedOption.description}</p>
            <p><strong>Quantity:</strong> ${selectedOption.quantity}</p>
            <p><strong>Total Amount:</strong> AUD $${totalAmount.toFixed(2)}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${sanitizedFormData.firstName} ${sanitizedFormData.middleName ? sanitizedFormData.middleName + ' ' : ''}${sanitizedFormData.lastName}</p>
            <p><strong>Email:</strong> ${sanitizedFormData.email}</p>
            <p><strong>Phone:</strong> ${sanitizedFormData.phoneNumber || 'Not provided'}</p>
            <p><strong>Mobile:</strong> ${sanitizedFormData.mobileNumber}</p>
            <p><strong>Address:</strong> ${sanitizedFormData.address1}${sanitizedFormData.address2 ? ', ' + sanitizedFormData.address2 : ''}</p>
            <p><strong>City:</strong> ${sanitizedFormData.city}</p>
            <p><strong>State:</strong> ${sanitizedFormData.state}</p>
            <p><strong>Country:</strong> ${sanitizedFormData.country}</p>
            <p><strong>Post Code:</strong> ${sanitizedFormData.postcode}</p>
            ${sanitizedFormData.dateOfBirth ? `<p><strong>Date of Birth:</strong> ${sanitizedFormData.dateOfBirth}</p>` : ''}
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Payment Information</h3>
            <p><strong>Payment Method:</strong> ${sanitizedFormData.paymentMethod === 'bank-transfer' ? 'Bank Transfer' : 'Other'}</p>
            ${sanitizedFormData.comments ? `<p><strong>Comments:</strong> ${sanitizedFormData.comments}</p>` : ''}
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">Next Steps</h3>
            <p style="color: #92400e; margin: 0;">
              1. Our team will review your order within 24 hours<br>
              2. You will receive payment instructions via email<br>
              3. Once payment is confirmed, your order will be processed<br>
              4. Shipping details will be provided once your order is ready
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0;">
              If you have any questions, please contact us at:<br>
              <strong>Email:</strong> dinars@dinarexchange.com.au<br>
              <strong>Phone:</strong> 1300 856 881<br>
              <strong>Mobile:</strong> 0417 460 236
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email to customer
    const customerMailOptions = {
      from: `"Dinar Exchange" <${process.env.SMTP_USER}>`,
      to: sanitizedFormData.email,
      subject: `Order Confirmation - ${selectedOption.description} (${orderNumber})`,
      html: emailContent,
    };

    // Send email to admin
    const adminMailOptions = {
      from: `"Dinar Exchange" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Order Received - ${selectedOption.description} (${orderNumber})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">New Order Alert</h1>
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
            <h2>New order received for ${currencyType}</h2>
            ${emailContent}
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Order confirmation emails sent successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
