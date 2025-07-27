import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { status } = body;

    // Update order status
    const { data: order, error } = await supabase
      .from('orders')
      .update({ 
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }

    // Send status update email
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-status-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: order,
          status: status
        }),
      });

      if (!emailResponse.ok) {
        console.error('Status update email sending failed');
      }
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      order: order,
      message: 'Order status updated successfully' 
    });

  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 