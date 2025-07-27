'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import OrderFlow from '@/components/OrderFlow';

const zimOptions = [
  { id: 108, quantity: "10,000", price: 45.00, description: "10,000 Zimbabwe Dollars" },
  { id: 107, quantity: "25,000", price: 95.00, description: "25,000 Zimbabwe Dollars" },
  { id: 106, quantity: "50,000", price: 175.00, description: "50,000 Zimbabwe Dollars" },
  { id: 105, quantity: "100,000", price: 325.00, description: "100,000 Zimbabwe Dollars" },
  { id: 104, quantity: "250,000", price: 750.00, description: "250,000 Zimbabwe Dollars" },
  { id: 103, quantity: "500,000", price: 1400.00, description: "500,000 Zimbabwe Dollars" },
  { id: 102, quantity: "1,000,000", price: 2600.00, description: "1,000,000 Zimbabwe Dollars" },
  { id: 101, quantity: "2,500,000", price: 6000.00, description: "2,500,000 Zimbabwe Dollars" },
  { id: 100, quantity: "5,000,000", price: 11500.00, description: "5,000,000 Zimbabwe Dollars" },
  { id: 99, quantity: "10,000,000", price: 22000.00, description: "10,000,000 Zimbabwe Dollars" },
  { id: 98, quantity: "25,000,000", price: 52000.00, description: "25,000,000 Zimbabwe Dollars" },
  { id: 97, quantity: "50,000,000", price: 100000.00, description: "50,000,000 Zimbabwe Dollars" }
];

export default function BuyZim() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [showOrderFlow, setShowOrderFlow] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // No automatic redirect - show content first

  const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const option = zimOptions.find(opt => opt.id === selectedId);
    setSelectedOption(option || null);
  };

  const handleAddToCart = () => {
    if (!selectedOption) {
      alert('Please select a quantity first.');
      return;
    }
    
    // Check if user is logged in
    if (!user) {
      router.push('/auth/signin?redirectedFrom=/buy-zim');
      return;
    }
    
    setShowOrderFlow(true);
  };

  const handleOrderComplete = async (orderData: any) => {
    try {
      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Create order in database
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedOption,
          totalAmount: selectedOption?.price || 0,
          customerInfo: orderData,
          paymentMethod: orderData.paymentMethod,
          orderNumber
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();
      
      console.log('Order completed:', result);
      setOrderComplete(true);
      setShowOrderFlow(false);

      // Show success message
      alert('Order submitted successfully! You will receive a confirmation email shortly.');

      // Reset form
      setSelectedOption(null);
      setOrderComplete(false);
    } catch (error) {
      console.error('Order creation error:', error);
      alert('Failed to submit order. Please try again.');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showOrderFlow) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <OrderFlow
            selectedOption={selectedOption}
            totalAmount={selectedOption?.price || 0}
            onComplete={handleOrderComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Buy Zimbabwe Dollar
          </h1>
          <p className="text-xl md:text-2xl font-semibold mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Historical Zimbabwe Dollar Currency Collection
          </p>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-8 px-6 bg-red-50 border-b-4 border-red-200">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-red-800 mb-4">⚠️ Important Disclaimer</h2>
            <p className="text-red-700 leading-relaxed">
              <strong>The Zimbabwe currency we are selling was discontinued in April 2009.</strong> We do not sell the new updated currency, ZiG. This is by updates from the Reserve Bank of Zimbabwe. Please be aware that this currency is no longer in use for transactions in Zimbabwe.
            </p>
            <p className="text-red-700 leading-relaxed mt-3">
              In January 2009, the Reserve Bank of Zimbabwe allowed the use of foreign currency in response to economic turmoil and hyperinflation reaching 5 billion percent. By April 2009, the Zimbabwean dollar was suspended indefinitely. The government then adopted a multiple currency framework, including the Australian Dollar, Botswana Pula, British Pound, Chinese Yuan, Euro, Japanese Yen, Indian Rupee, South African Rand, and United States Dollar.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Notice */}
      <section className="py-6 px-6 bg-orange-50 border-b border-orange-200">
        <div className="container mx-auto text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-200">
            <p className="text-orange-800 font-semibold">
              💳 All orders are accepted in AUD only. Payment will be made in AUD.
            </p>
          </div>
        </div>
      </section>

      {/* Login Required Notice */}
      <section className="py-6 px-6 bg-blue-50 border-b border-blue-200">
        <div className="container mx-auto text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-200">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="text-lg font-bold text-blue-900">Login Required for All Purchases</h3>
            </div>
            <p className="text-blue-800 mb-4">
              For your security and to provide the best service, all purchases require a registered account.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-700">Secure Order Processing</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-700">Track Order Status</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-700">Email Notifications</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Product Selection */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Select Your Quantity</h2>
              <p className="text-gray-600 mb-8">
                Please select your quantity and denomination of Zimbabwe Dollars required.
                These are historical collectible notes that were discontinued in 2009.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Denomination & Quantity *
                  </label>
                  <select
                    value={selectedOption?.id || ''}
                    onChange={handleOptionSelect}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  >
                    <option value="">Choose your quantity...</option>
                    {zimOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.quantity} Zimbabwe Dollars - ${option.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedOption && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-blue-800">Selected:</span>
                      <span className="text-blue-800">{selectedOption.description} - ${selectedOption.price.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedOption}
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 text-lg"
                >
                  Proceed to Order
                </button>
              </div>
            </div>

            {/* Information Panel */}
            <div className="space-y-6">
              {/* Login Benefits */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 border border-blue-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">Account Benefits</h3>
                    <p className="text-blue-700">Why login is required for all purchases</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Secure Order Processing</h4>
                        <p className="text-blue-700 text-sm">Your personal and payment information is protected with bank-level security</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Real-time Order Tracking</h4>
                        <p className="text-blue-700 text-sm">Monitor your order status from processing to delivery</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Email Notifications</h4>
                        <p className="text-blue-700 text-sm">Receive updates on order status, shipping, and delivery</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Order History</h4>
                        <p className="text-blue-700 text-sm">Access your complete purchase history and receipts</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Customer Support</h4>
                        <p className="text-blue-700 text-sm">Priority support for registered customers</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">AUSTRAC Compliance</h4>
                        <p className="text-blue-700 text-sm">All transactions are recorded for regulatory compliance</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm font-medium">
                    <strong>Note:</strong> Account creation is free and takes less than 2 minutes. Your information is protected and never shared with third parties.
                  </p>
                </div>
              </div>

              {/* Trust Information */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Why Choose Dinar Exchange New Zealand?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">100% Authentic Notes</h4>
                      <p className="text-gray-600 text-sm">All Zimbabwe Dollars are verified and authentic historical currency notes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">NZ Post Delivery</h4>
                      <p className="text-gray-600 text-sm">Secure, tracked delivery via New Zealand Post</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">AUSTRAC Registered</h4>
                      <p className="text-gray-600 text-sm">Fully compliant with Australian financial regulations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">10+ Years Experience</h4>
                      <p className="text-gray-600 text-sm">Trusted by thousands of customers across New Zealand</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                      </svg>
                    </div>
                    <span className="font-semibold">Bank Transfer</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold">PayID</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold">Cash Payment (By Appointment Only)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Important Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Historical Currency</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Discontinued Zimbabwe Dollar notes</li>
                <li>• Historical collectible value</li>
                <li>• No longer legal tender</li>
                <li>• For collection purposes only</li>
              </ul>
            </div>
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-orange-900">Shipping & Security</h3>
              <ul className="space-y-2 text-orange-800">
                <li>• Orders shipped within 5-7 business days</li>
                <li>• Registered post with tracking</li>
                <li>• Secure packaging for protection</li>
                <li>• ASIC and AUSTRAC registered</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
