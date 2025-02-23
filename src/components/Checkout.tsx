'use client';
import { useCart } from '@/context/CartContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { FormEvent, useState, useRef, ChangeEvent } from 'react';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Checkout({ isOpen, onClose }: CheckoutProps) {
  const { items, getCartTotal, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<'Pickup' | 'Delivery'>('Pickup');
  const [pickupLocation, setPickupLocation] = useState('');

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen) return null;

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Form validation
    const form = e.target as HTMLFormElement;
    const email = form.querySelector<HTMLInputElement>('#email')?.value;
    const phone = form.querySelector<HTMLInputElement>('#phone')?.value;
    const zip = form.querySelector<HTMLInputElement>('#zip')?.value;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Phone validation (accepts (123) 456-7890 or 123-456-7890 or 1234567890)
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone && !phoneRegex.test(phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    // ZIP code validation (5 digits)
    if (deliveryMethod === 'Delivery' && zip) {
      const zipRegex = /^\d{5}$/;
      if (!zipRegex.test(zip)) {
        alert('Please enter a valid 5-digit ZIP code');
        return;
      }
    }

    setIsSubmitting(true);
    const formData = new FormData(form);
    
    // Create a hidden iframe if it doesn't exist
    if (!iframeRef.current) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframeRef.current = iframe;
    }

    // Create a temporary form in the iframe and submit it
    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (iframeDoc) {
      const tempForm = iframeDoc.createElement('form');
      tempForm.method = 'POST';
      tempForm.action = form.action;
      
      // Copy all form data to the temporary form
      for (const [key, value] of formData.entries()) {
        const input = iframeDoc.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value.toString();
        tempForm.appendChild(input);
      }

      iframeDoc.body.appendChild(tempForm);
      tempForm.submit();

      // Show success message after a brief delay
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        clearCart();
      }, 1000);
    }
  };

  // Helper function to get quantity of a specific product
  const getProductQuantity = (productId: string) => {
    const item = items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Function to format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format according to length
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    }
  };

  // Handle phone input change
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const unformattedValue = input.value.replace(/\D/g, '');
    const cursorPosition = input.selectionStart || 0;
    
    // Get the number of digits before the cursor
    const digitsBeforeCursor = input.value
      .slice(0, cursorPosition)
      .replace(/\D/g, '').length;
    
    // Only allow up to 10 digits
    if (unformattedValue.length <= 10) {
      const formattedValue = formatPhoneNumber(unformattedValue);
      input.value = formattedValue;

      // Calculate new cursor position
      let newPosition = 0;
      let digitCount = 0;

      // Find the position after the same number of digits
      for (let i = 0; i < formattedValue.length; i++) {
        if (/\d/.test(formattedValue[i])) {
          digitCount++;
          if (digitCount > digitsBeforeCursor) break;
        }
        newPosition = i + 1;
      }

      input.setSelectionRange(newPosition, newPosition);
    }
  };

  console.log('Current delivery method:', deliveryMethod);
  console.log('Pickup location showing:', deliveryMethod === 'Pickup');

  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-[600px] bg-white shadow-xl z-50 overflow-y-auto">
      {submitSuccess ? (
        <div className="absolute inset-0 bg-white z-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-lg border border-gray-200">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
              <div className="space-y-4">
                <p className="text-green-600 font-semibold text-lg">Your order has been submitted successfully!</p>
                <div className="text-gray-600 space-y-2">
                  <p>A copy of the inquiry should be sent to your email.</p>
                  <p>Please await 1-3 business days for the confirmation of the order.</p>
                  <p className="mt-4">For all questions and concerns, please reach out to us at:</p>
                  <p className="font-medium text-gray-800">miegourmetcafe@gmail.com</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full bg-orange-500 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Order Summary</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-gray-700">Quantity: {item.quantity}</p>
                    <p className="text-gray-900 font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form 
            action="https://docs.google.com/forms/d/e/1FAIpQLScBoVfZBJXTQiM0jPMDgn6010RHKsubTduJLYn37KX4XBCVeA/formResponse"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Hidden fields for product quantities */}
            <input type="hidden" name="entry.1736886415" value={getProductQuantity('german')} />
            <input type="hidden" name="entry.1576201446" value={getProductQuantity('strawberry')} />
            <input type="hidden" name="entry.794611865" value={getProductQuantity('pineapple-upside')} />
            <input type="hidden" name="entry.1623293201" value={getProductQuantity('sweet-potato')} />
            <input type="hidden" name="entry.1748200991" value={getProductQuantity('pineapple-dream')} />

            {/* Hidden "Requested" field */}
            <input type="hidden" name="entry.227808856" value="Requested" />

            {/* Customer Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Customer Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="entry.2005620554"
                      id="firstName"
                      required
                      className={inputClasses}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="entry.459367327"
                      id="lastName"
                      required
                      className={inputClasses}
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="entry.139397393"
                    id="email"
                    required
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    title="Please enter a valid email address"
                    className={inputClasses}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="entry.1166974658"
                    id="phone"
                    required
                    className={inputClasses}
                    placeholder="(123) 456-7890"
                    onChange={handlePhoneChange}
                    maxLength={14} // (XXX) XXX-XXXX = 14 characters
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Delivery Method <span className="text-red-500">*</span>
              </h3>
              <div className="space-y-4">
                <select
                  name="entry.810317111"
                  className={inputClasses}
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value as 'Pickup' | 'Delivery')}
                  required
                >
                  <option value="">Select delivery method</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Delivery">Delivery</option>
                </select>

                {deliveryMethod === 'Pickup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Pickup Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="entry.211499256"
                      className={inputClasses}
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                    >
                      <option value="">Select a pickup location</option>
                      <option value="Islamic Society of Boston Cultural Center (ISBCC)">
                        Islamic Society of Boston Cultural Center (ISBCC)
                      </option>
                      <option value="Mosque for Praising Allah">Mosque for Praising Allah</option>
                      <option value="Masjid Al-Quran">Masjid Al-Quran</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Information */}
            {deliveryMethod === 'Delivery' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Delivery Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="street1" className="block text-sm font-medium text-gray-900">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="entry.339907381"
                      id="street1"
                      className={inputClasses}
                      placeholder="123 Main St"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="street2" className="block text-sm font-medium text-gray-900">
                      Apartment, suite, etc. (Optional)
                    </label>
                    <input
                      type="text"
                      name="entry.93138536"
                      id="street2"
                      className={inputClasses}
                      placeholder="Apt #123"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-900">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="entry.983591380"
                      id="zip"
                      className={inputClasses}
                      placeholder="12345"
                      required
                      pattern="\d{5}"
                      title="Please enter a valid 5-digit ZIP code"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Comments Field */}
            <div className="mb-8">
              <label htmlFor="comments" className="block text-sm font-medium text-gray-900">Special Instructions (Optional)</label>
              <textarea
                name="entry.839337160"
                id="comments"
                className={inputClasses}
                rows={3}
                placeholder="Any special instructions for your order"
              />
            </div>

            {/* Total and Submit */}
            <div className="border-t pt-6">
              <div className="flex justify-between text-xl mb-6">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">${getCartTotal().toFixed(2)}</span>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
