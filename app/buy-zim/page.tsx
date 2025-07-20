'use client';
import { useState } from 'react';

const zimOptions = [
  { id: 1, quantity: "10,000", price: 45.00, description: "10,000 Zimbabwe Dollars" },
  { id: 2, quantity: "25,000", price: 95.00, description: "25,000 Zimbabwe Dollars" },
  { id: 3, quantity: "50,000", price: 175.00, description: "50,000 Zimbabwe Dollars" },
  { id: 4, quantity: "100,000", price: 325.00, description: "100,000 Zimbabwe Dollars" },
  { id: 5, quantity: "250,000", price: 750.00, description: "250,000 Zimbabwe Dollars" },
  { id: 6, quantity: "500,000", price: 1400.00, description: "500,000 Zimbabwe Dollars" },
  { id: 7, quantity: "1,000,000", price: 2600.00, description: "1,000,000 Zimbabwe Dollars" },
  { id: 8, quantity: "2,500,000", price: 6000.00, description: "2,500,000 Zimbabwe Dollars" },
  { id: 9, quantity: "5,000,000", price: 11500.00, description: "5,000,000 Zimbabwe Dollars" },
  { id: 10, quantity: "10,000,000", price: 22000.00, description: "10,000,000 Zimbabwe Dollars" },
  { id: 11, quantity: "25,000,000", price: 52000.00, description: "25,000,000 Zimbabwe Dollars" },
  { id: 12, quantity: "50,000,000", price: 100000.00, description: "50,000,000 Zimbabwe Dollars" }
];

export default function BuyZim() {
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Australia',
    paymentMethod: 'bank-transfer',
    specialInstructions: ''
  });

  const selectedOption = zimOptions.find(option => option.quantity === selectedQuantity);

  // Calculate price for custom amount (using rate from 100,000 option as base)
  const baseRate = 325.00 / 100000; // Rate per Zimbabwe Dollar
  const customPrice = customAmount ? parseFloat(customAmount.replace(/,/g, '')) * baseRate : 0;

  const totalAmount = selectedOption ? selectedOption.price : (customAmount ? customPrice : 0);
  const finalDescription = selectedOption ? selectedOption.description : (customAmount ? `${customAmount} Zimbabwe Dollars` : '');

  const handleQuantityChange = (quantity: string) => {
    setSelectedQuantity(quantity);
    setCustomAmount(''); // Clear custom amount when selecting predefined option
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and commas
    const cleanValue = value.replace(/[^0-9,]/g, '');
    setCustomAmount(cleanValue);
    setSelectedQuantity(''); // Clear selected option when entering custom amount
  };

  const handleAddToCart = () => {
    if (!selectedQuantity && !customAmount) {
      alert('Please select a quantity or enter a custom amount first.');
      return;
    }
    setShowCheckout(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOption && !customAmount) {
      alert('Please select a quantity or enter a custom amount first.');
      return;
    }

    const orderData = {
      product: 'Zimbabwe Dollar',
      quantity: selectedOption ? selectedOption.quantity : customAmount,
      amount: totalAmount,
      description: finalDescription,
      customerInfo: formData,
      orderDate: new Date().toISOString()
    };

    try {
      // Here you would typically send the order to your backend
      // For now, we'll simulate sending an email
      console.log('Order submitted:', orderData);

      // Simulate email sending
      const emailBody = `
        New Zimbabwe Dollar Order:

        Product: ${orderData.product}
        Quantity: ${orderData.quantity}
        Amount: $${orderData.amount}
        Description: ${orderData.description}

        Customer Information:
        Name: ${formData.firstName} ${formData.lastName}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Address: ${formData.address}
        City: ${formData.city}
        State: ${formData.state}
        Postcode: ${formData.postcode}
        Country: ${formData.country}

        Payment Method: ${formData.paymentMethod}
        Special Instructions: ${formData.specialInstructions}

        Order Date: ${new Date().toLocaleString()}
      `;

      // In a real implementation, you would send this to your email service
      alert('Order submitted successfully! You will receive a confirmation email shortly.');

      // Reset form
      setSelectedQuantity('');
      setCustomAmount('');
      setShowCheckout(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postcode: '',
        country: 'Australia',
        paymentMethod: 'bank-transfer',
        specialInstructions: ''
      });

    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
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

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity Desired *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {zimOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        selectedQuantity === option.quantity
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleQuantityChange(option.quantity)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">{option.quantity}</h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-600">${option.price.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Or Enter Custom Amount
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="e.g., 150,000"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <span className="text-gray-600 font-semibold">ZWD</span>
                  </div>
                  {customAmount && (
                    <div className="mt-2 text-sm text-gray-600">
                      Estimated Price: <span className="font-semibold text-emerald-600">${customPrice.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {(selectedQuantity || customAmount) && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-800">Selected:</span>
                      <span className="text-green-800">{finalDescription} - ${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedQuantity && !customAmount}
                  className="w-full bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Checkout Form */}
            {showCheckout && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h2>

                <form onSubmit={handleCheckout} className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                    <div className="flex justify-between">
                      <span>{finalDescription}</span>
                      <span className="font-bold">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Postcode *</label>
                      <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="Australia">Australia</option>
                      <option value="New Zealand">New Zealand</option>
                    </select>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method *</label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank-transfer"
                          checked={formData.paymentMethod === 'bank-transfer'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <span>Bank Transfer (Direct Deposit)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="payid"
                          checked={formData.paymentMethod === 'payid'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <span>PayID</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <span>Cash Payment (By Appointment Only)</span>
                      </label>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Special Instructions</label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Any special instructions or notes..."
                    />
                  </div>

                  {/* Total */}
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-emerald-600">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Complete Order
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Important Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-900">Historical Currency</h3>
              <ul className="space-y-2 text-emerald-800">
                <li>• Discontinued Zimbabwe Dollar notes</li>
                <li>• Historical collectible value</li>
                <li>• No longer legal tender</li>
                <li>• For collection purposes only</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Shipping & Security</h3>
              <ul className="space-y-2 text-blue-800">
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
