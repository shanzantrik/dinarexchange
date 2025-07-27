'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal';

interface OrderFlowProps {
  selectedOption: any;
  totalAmount: number;
  onComplete: (orderData: any) => void;
}

// State/Province data for each country
const stateData = {
  'New Zealand': [
    'Auckland', 'Wellington', 'Canterbury', 'Waikato', 'Bay of Plenty',
    'Manawatu-Wanganui', 'Otago', 'Hawke\'s Bay', 'Taranaki', 'Northland',
    'Marlborough', 'Westland', 'Gisborne', 'Nelson', 'Southland'
  ],
  'Australia': [
    'New South Wales', 'Victoria', 'Queensland', 'Western Australia',
    'South Australia', 'Tasmania', 'Australian Capital Territory',
    'Northern Territory'
  ]
};

export default function OrderFlow({ selectedOption, totalAmount, onComplete }: OrderFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'error' | 'success' | 'info';
  }>({ isOpen: false, title: '', message: '', type: 'info' });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    driversLicenseNumber: '',
    passportNumber: '',
    otherGovernmentId: '',
    email: '',
    phoneNumber: '',
    mobileNumber: '',
    address1: '',
    address2: '',
    city: '',
    country: 'New Zealand',
    state: '',
    postcode: '',
    paymentMethod: 'bank-transfer',
    comments: '',
    agreeToTerms: false,
    dateOfBirth: '',
    idType: 'passport'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Reset state when country changes
    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        country: value,
        state: ''
      }));
    }
  };

  const showModal = (title: string, message: string, type: 'error' | 'success' | 'info' = 'info') => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: '', message: '', type: 'info' });
  };

  const handleProceedToStep2 = () => {
    const requiredFields = [
      { field: 'firstName', label: 'First Name' },
      { field: 'lastName', label: 'Last Name' },
      { field: 'email', label: 'Email Address' },
      { field: 'mobileNumber', label: 'Mobile Number' },
      { field: 'address1', label: 'Address 1' },
      { field: 'city', label: 'City' },
      { field: 'postcode', label: 'Post Code' }
    ];

    const missingFields = requiredFields.filter(({ field }) => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      const fieldLabels = missingFields.map(f => f.label).join(', ');
      showModal(
        'Required Fields Missing',
        `Please fill in the following required fields: ${fieldLabels}`,
        'error'
      );
      return;
    }

    setCurrentStep(2);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = async () => {
    if (isSubmitting) {
      return; // Prevent duplicate submissions
    }

    if (!formData.agreeToTerms) {
      showModal(
        'Terms Agreement Required',
        'You must agree to the Terms of Service and Privacy Policy to continue.',
        'error'
      );
      return;
    }

    if (!uploadedFile) {
      showModal(
        'Document Upload Required',
        'Please upload your identity document before submitting the order.',
        'error'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Show loading modal
      showModal(
        'Processing Order',
        'Please wait while we process your order and send confirmation emails...',
        'info'
      );

      // Prepare customer info for database
      const customerInfo = {
        fullName: `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phoneNumber,
        mobile: formData.mobileNumber,
        address: `${formData.address1}${formData.address2 ? ', ' + formData.address2 : ''}, ${formData.city}, ${formData.state}, ${formData.postcode}, ${formData.country}`,
        dateOfBirth: formData.dateOfBirth,
        idType: formData.idType,
        idNumber: formData.driversLicenseNumber || formData.passportNumber || formData.otherGovernmentId,
        comments: formData.comments
      };

      // Create order in database
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedOption,
          totalAmount,
          customerInfo,
          paymentMethod: formData.paymentMethod,
          orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create order');
      }

      // Close loading modal
      closeModal();

      // Show success modal
      showModal(
        'Order Submitted Successfully!',
        `Your order has been submitted and confirmation emails have been sent. Order Number: ${result.order.order_number}. You will receive payment instructions shortly.`,
        'success'
      );

      const orderData = {
        ...formData,
        selectedOption,
        totalAmount,
        uploadedFile: uploadedFile.name,
        orderDate: new Date().toISOString(),
        orderNumber: result.order.order_number
      };

      // Call onComplete after a short delay to show the success message
      setTimeout(() => {
        onComplete(orderData);
      }, 3000);

    } catch (error) {
      console.error('Error submitting order:', error);
      closeModal();
      showModal(
        'Order Submission Error',
        'There was an error submitting your order. Please try again or contact us for assistance.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        showModal(
          'Invalid File Type',
          'Please upload a JPG, PNG, or PDF file only.',
          'error'
        );
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        showModal(
          'File Too Large',
          'Please upload a file smaller than 10MB.',
          'error'
        );
        return;
      }

      setUploadedFile(file);
      showModal(
        'File Uploaded Successfully',
        `File "${file.name}" has been uploaded successfully.`,
        'success'
      );
    }
  };

  const handleCameraCapture = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Create a video element for camera preview
      const video = document.createElement('video');
      video.style.position = 'fixed';
      video.style.top = '0';
      video.style.left = '0';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.zIndex = '9999';
      video.style.backgroundColor = 'black';
      video.autoplay = true;

      // Create canvas for capturing
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Create capture button
      const captureBtn = document.createElement('button');
      captureBtn.textContent = 'Capture Photo';
      captureBtn.style.position = 'fixed';
      captureBtn.style.bottom = '20px';
      captureBtn.style.left = '50%';
      captureBtn.style.transform = 'translateX(-50%)';
      captureBtn.style.zIndex = '10000';
      captureBtn.style.padding = '10px 20px';
      captureBtn.style.backgroundColor = '#f16f01';
      captureBtn.style.color = 'white';
      captureBtn.style.border = 'none';
      captureBtn.style.borderRadius = '8px';
      captureBtn.style.cursor = 'pointer';

      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'Close Camera';
      closeBtn.style.position = 'fixed';
      closeBtn.style.top = '20px';
      closeBtn.style.right = '20px';
      closeBtn.style.zIndex = '10000';
      closeBtn.style.padding = '10px 20px';
      closeBtn.style.backgroundColor = '#dc2626';
      closeBtn.style.color = 'white';
      closeBtn.style.border = 'none';
      closeBtn.style.borderRadius = '8px';
      closeBtn.style.cursor = 'pointer';

      const cleanup = () => {
        document.body.removeChild(video);
        document.body.removeChild(captureBtn);
        document.body.removeChild(closeBtn);
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      };

      let stream: MediaStream;

      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          stream = mediaStream;
          video.srcObject = mediaStream;
          document.body.appendChild(video);
          document.body.appendChild(captureBtn);
          document.body.appendChild(closeBtn);

          captureBtn.onclick = () => {
            if (context && video.videoWidth > 0) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              context.drawImage(video, 0, 0);

              canvas.toBlob((blob) => {
                if (blob) {
                  const file = new File([blob], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
                  setUploadedFile(file);
                  showModal(
                    'Photo Captured Successfully',
                    'Your photo has been captured and uploaded successfully.',
                    'success'
                  );
                }
                cleanup();
              }, 'image/jpeg', 0.8);
            }
          };

          closeBtn.onclick = cleanup;
        })
        .catch((error) => {
          showModal(
            'Camera Access Denied',
            'Unable to access camera. Please use the upload option instead.',
            'error'
          );
        });
    } else {
      showModal(
        'Camera Not Available',
        'Camera access is not available in your browser. Please use the upload option.',
        'error'
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${currentStep >= 1 ? 'text-orange-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-300'}`}>
              1
            </div>
            <span className="ml-2 font-semibold">Order Details</span>
          </div>
          <div className="w-16 h-1 bg-gray-300"></div>
          <div className={`flex items-center ${currentStep >= 2 ? 'text-orange-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-300'}`}>
              2
            </div>
            <span className="ml-2 font-semibold">Identity Verification</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Step 1: Order Details */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Please provide your contact information</h2>
              <p className="text-red-600 text-sm mb-6">Only required if purchase is made from these entities.</p>

              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      placeholder="Middle Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* AUSTRAC Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    We require your Identification Documents as Oz Trading Group Pty Ltd is enrolled in AML/CTF program with AUSTRAC, Australia's anti-money laundering and counter-terrorism financing regulator and specialist financial intelligence unit. And its is one of the mandatory requirements to identify customers before we sell currency. For info please visit <a href="https://www.Austrac.gov.au" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">www.Austrac.gov.au</a>
                  </p>
                </div>

                {/* ID Fields */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Drivers License Number</label>
                  <input
                    type="text"
                    name="driversLicenseNumber"
                    value={formData.driversLicenseNumber}
                    onChange={handleInputChange}
                    placeholder="Drivers License Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-red-600 text-xs mt-1">In case Drivers License is not available you can provide Alternative form of Identification like Passport, Govt ID.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Passport Number</label>
                  <input
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                    placeholder="Passport Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Any other Government Id</label>
                  <input
                    type="text"
                    name="otherGovernmentId"
                    value={formData.otherGovernmentId}
                    onChange={handleInputChange}
                    placeholder="Any other Government Id"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Contact Fields */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email Address*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="Mobile Number*"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <p className="text-red-600 text-xs">Note: Please do not prefix 0 before your mobile number, kindly follow this format +61417460236</p>

                {/* Shipping Address */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-4">Shipping Address (We will NOT ship to PO Boxes!)</h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address 1 *</label>
                    <input
                      type="text"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      required
                      placeholder="Address1*"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address 2</label>
                    <input
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      placeholder="Address2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="City*"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="New Zealand">New Zealand</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State/Province *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Please select the state/province</option>
                        {stateData[formData.country as keyof typeof stateData]?.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Post Code *</label>
                      <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        required
                        placeholder="Post Code*"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping & Handling */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-4">Shipping & Handling Charge</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Total Amount</label>
                      <input
                        type="text"
                        value={`$${totalAmount.toFixed(2)}`}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Amount of shipping & handling as per country</label>
                      <input
                        type="text"
                        value="Free Shipping"
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-4">Please choose your payment method</h3>
                  <div className="mb-4">
                    <h4 className="text-orange-600 font-semibold mb-3">SELECT YOUR PAYMENT OPTION</h4>
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
                        <span>Bank Transfer</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="western-union"
                          checked={formData.paymentMethod === 'western-union'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <span>Western Union Money Transfer</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Comments</label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Any additional comments..."
                  />
                </div>

                {/* Total Payable Amount */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Payable Amount</label>
                  <input
                    type="text"
                    value={`$${totalAmount.toFixed(2)}`}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white font-bold text-lg"
                  />
                </div>

                <button
                  onClick={handleProceedToStep2}
                  className="w-full bg-orange-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  Proceed to Identity Verification
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Identity Verification */}
        <AnimatePresence mode="wait">
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Step 2 of 2: Verify Your Identity</h2>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <div className="text-blue-500 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Why We Ask for This</h3>
                    <p className="text-blue-800 text-sm">
                      To complete your order, please verify your identity as per AUSTRAC regulations. We are a registered AUSTRAC reporting entity and required by law to verify your identity before shipping currency orders. Your documents are encrypted and stored securely.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select ID Type *</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="idType"
                        value="drivers-licence"
                        checked={formData.idType === 'drivers-licence'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span>New Zealand Driver's Licence</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="idType"
                        value="passport"
                        checked={formData.idType === 'passport'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span>New Zealand/International Passport</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Identity Document *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={handleCameraCapture}
                      className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors"
                    >
                      <svg className="w-8 h-8 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm font-medium text-orange-600">Take a Photo Now</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors"
                    >
                      <svg className="w-8 h-8 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span className="text-sm font-medium text-orange-600">Upload from Gallery</span>
                    </button>
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <p className="text-xs text-gray-500 mt-2">(JPG, PNG, or PDF accepted - Max 10MB per file)</p>

                  {/* Uploaded file display */}
                  {uploadedFile && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-800 font-medium">{uploadedFile.name}</span>
                        <button
                          onClick={() => setUploadedFile(null)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms and Privacy */}
                <div className="border-t pt-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-orange-600 font-semibold mb-3">DINAR EXCHANGE PRIVACY STATEMENT</h4>
                    <div className="text-xs text-gray-600 max-h-32 overflow-y-auto">
                      <p className="mb-2">
                        This online privacy statement describes how Dinar Exchange collects and uses your personal information ("Information") that we obtain when you visit and/or use our Web site. The currency exchange services offered on this Web site are provided by Oz Trading Group Pty Ltd ACN 158 981 787 trading as Dinar Exchange. As a reporting entity Dinar Exchange is bound by the National Privacy Principles under the Privacy Act 1988 (Commonwealth).
                      </p>
                      <p className="mb-2">
                        By exchanging currency through Dinar Exchange you are consenting to the collection, transfer and storage of this Information by computers or other transfer or storage devices in Australia, including the transfer and retention of your data outside of the Australia to other countries.
                      </p>
                      <p>
                        We collect Information you supply when: (a) you ask us for currency exchange; (b) you submit Information on applications or other forms to us; or (c) you otherwise submit personal information to us. We collect personal information about your transactions with us and from third party sources to verify information you provide.
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-red-600 text-sm mb-3">
                      Terms of Service: Dinar Exchange reserves the right to cancel and refund an order at any time without prior notice. All sales are final, upon ordering you agree to these terms.
                    </p>
                  </div>

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the Dinar Exchange Terms of Service and Privacy Policy
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    In order to use our services, you must agree to Dinar Exchange Terms of Service and Privacy Policy.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm font-semibold">
                    Please hit the "Submit" button only once as your order may take up to a minute to process.
                  </p>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  className="w-full bg-orange-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  Submit Order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}

