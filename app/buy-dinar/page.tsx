'use client';
import { useState } from 'react';
import OrderFlow from '@/components/OrderFlow';

const dinarOptions = [
  { id: 108, quantity: "25,000", price: 186.25, description: "25,000 Iraqi Dinars" },
  { id: 107, quantity: "50,000", price: 281.25, description: "50,000 Iraqi Dinars" },
  { id: 106, quantity: "75,000", price: 325.00, description: "75,000 Iraqi Dinars" },
  { id: 105, quantity: "100,000", price: 381.25, description: "100,000 Iraqi Dinars" },
  { id: 104, quantity: "200,000", price: 656.00, description: "200,000 Iraqi Dinars" },
  { id: 103, quantity: "500,000", price: 1875.00, description: "500,000 Iraqi Dinars" },
  { id: 102, quantity: "1,000,000", price: 2800.00, description: "1,000,000 Iraqi Dinars" },
  { id: 101, quantity: "1,500,000", price: 4200.00, description: "1,500,000 Iraqi Dinars" },
  { id: 100, quantity: "2,000,000", price: 5600.00, description: "2,000,000 Iraqi Dinars" },
  { id: 99, quantity: "2,500,000", price: 7000.00, description: "2,500,000 Iraqi Dinars" },
  { id: 98, quantity: "3,000,000", price: 8400.00, description: "3,000,000 Iraqi Dinars" },
  { id: 97, quantity: "3,500,000", price: 9800.00, description: "3,500,000 Iraqi Dinars" },
  { id: 96, quantity: "4,000,000", price: 11200.00, description: "4,000,000 Iraqi Dinars" },
  { id: 95, quantity: "4,500,000", price: 12600.00, description: "4,500,000 Iraqi Dinars" },
  { id: 94, quantity: "5,000,000", price: 14000.00, description: "5,000,000 Iraqi Dinars" },
  { id: 93, quantity: "6,000,000", price: 16800.00, description: "6,000,000 Iraqi Dinars" },
  { id: 92, quantity: "7,000,000", price: 19600.00, description: "7,000,000 Iraqi Dinars" },
  { id: 91, quantity: "8,000,000", price: 22400.00, description: "8,000,000 Iraqi Dinars" },
  { id: 90, quantity: "9,000,000", price: 25200.00, description: "9,000,000 Iraqi Dinars" },
  { id: 89, quantity: "10,000,000", price: 28000.00, description: "10,000,000 Iraqi Dinars" },
  { id: 88, quantity: "11,000,000", price: 30800.00, description: "11,000,000 Iraqi Dinars" },
  { id: 87, quantity: "12,000,000", price: 33600.00, description: "12,000,000 Iraqi Dinars" },
  { id: 86, quantity: "13,000,000", price: 36400.00, description: "13,000,000 Iraqi Dinars" },
  { id: 85, quantity: "14,000,000", price: 39200.00, description: "14,000,000 Iraqi Dinars" },
  { id: 84, quantity: "15,000,000", price: 42000.00, description: "15,000,000 Iraqi Dinars" }
];

export default function BuyDinar() {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [showOrderFlow, setShowOrderFlow] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const option = dinarOptions.find(opt => opt.id === selectedId);
    setSelectedOption(option || null);
  };

  const handleAddToCart = () => {
    if (!selectedOption) {
      alert('Please select a quantity first.');
      return;
    }
    setShowOrderFlow(true);
  };

  const handleOrderComplete = (orderData: any) => {
    console.log('Order completed:', orderData);
    setOrderComplete(true);
    setShowOrderFlow(false);

    // Show success message
    alert('Order submitted successfully! You will receive a confirmation email shortly.');

    // Reset form
    setSelectedOption(null);
    setOrderComplete(false);
  };

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
      <section className="py-20 px-6 bg-gradient-to-r from-primary-500 to-orange-500 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Buy Iraqi Dinars
          </h1>
          <p className="text-xl md:text-2xl font-semibold mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Secure Iraqi Dinar Exchange in New Zealand
          </p>
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

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Product Selection */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Select Your Quantity</h2>
              <p className="text-gray-600 mb-8">
                Our website makes it easy for you to buy Iraqi Dinars in New Zealand.
                With the current political and military situations in Iraq, this currency will
                undoubtedly fluctuate and we offer great Iraqi Dinar exchange rates.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Denomination & Quantity *
                  </label>
                  <select
                    value={selectedOption?.id || ''}
                    onChange={handleOptionSelect}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  >
                    <option value="">Choose your quantity...</option>
                    {dinarOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.quantity} Iraqi Dinars - ${option.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedOption && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-800">Selected:</span>
                      <span className="text-green-800">{selectedOption.description} - ${selectedOption.price.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedOption}
                  className="w-full bg-orange-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 text-lg"
                >
                  Proceed to Order
                </button>
              </div>
            </div>

            {/* Information Panel */}
            <div className="space-y-6">
              {/* Trust Information */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Why Choose Dinar Exchange New Zealand?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">100% Authentic Notes</h4>
                      <p className="text-gray-600 text-sm">All Iraqi Dinars are verified and authentic currency notes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
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
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
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
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
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
                    <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
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
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Shipping Information</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Orders shipped within 5-7 business days</li>
                <li>• Registered post with tracking via NZ Post</li>
                <li>• Secure packaging for currency protection</li>
                <li>• Email confirmation upon shipment</li>
              </ul>
            </div>
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-900">Security & Authenticity</h3>
              <ul className="space-y-2 text-emerald-800">
                <li>• 100% authentic Iraqi Dinar notes</li>
                <li>• ASIC and AUSTRAC registered</li>
                <li>• Secure bank transfer payments</li>
                <li>• Professional customer service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
