import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { createClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      selectedOption, 
      totalAmount, 
      customerInfo, 
      paymentMethod,
      orderNumber 
    } = body;

    // Determine currency type based on selected option
    const currencyType = selectedOption.description.includes('Iraqi') ? 'IQD' : 'ZIM';
    
    // Create order in database
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        user_email: user.email,
        order_number: orderNumber,
        currency_type: currencyType,
        quantity: selectedOption.quantity,
        unit_price: selectedOption.price / parseInt(selectedOption.quantity.replace(/,/g, '')),
        total_amount: totalAmount,
        status: 'pending',
        customer_info: customerInfo,
        payment_method: paymentMethod,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Send confirmation email
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-order-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: order,
          customerInfo: customerInfo,
          selectedOption: selectedOption
        }),
      });

      if (!emailResponse.ok) {
        console.error('Email sending failed');
      }
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      order: order,
      message: 'Order created successfully' 
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const isAdmin = user.email === 'admin@dinarexchange.com.au' || 
                    user.user_metadata?.role === 'admin' ||
                    user.email === 'shaanjyot13@gmail.com';

    let query = supabase.from('orders').select('*');

    if (!isAdmin) {
      // Regular users can only see their own orders
      query = query.eq('user_id', user.id);
    }

    const { data: orders, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    return NextResponse.json({ orders });

  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 