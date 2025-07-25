import React from 'react';

interface TrustpilotWidgetProps {
  businessUnitId?: string;
  className?: string;
}

export default function TrustpilotWidget({ businessUnitId, className = '' }: TrustpilotWidgetProps) {
  return (
    <div className={`trustpilot-widget ${className}`}>
      {/* Trustpilot Star Rating */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-semibold text-gray-700">4.8/5</span>
        <span className="text-xs text-gray-500">(2,847 reviews)</span>
      </div>

      {/* Trustpilot Branding */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <span className="text-sm font-semibold text-green-600">Trustpilot</span>
        </div>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-xs text-gray-600">Trusted by thousands</span>
      </div>
    </div>
  );
}
