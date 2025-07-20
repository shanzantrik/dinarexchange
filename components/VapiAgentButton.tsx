import React, { useState } from 'react';
import { FaPhone, FaHeadset } from 'react-icons/fa';
import VapiAgentModal from './VapiAgentModal';

export default function VapiAgentButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-6 py-4 rounded-full font-bold text-lg shadow-2xl bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 transform hover:scale-105"
        style={{ boxShadow: '0 8px 32px 0 rgba(241, 111, 1, 0.3)' }}
        aria-label="Call Dinar Exchange Support Assistant"
        type="button"
      >
        <div className="relative">
          <FaHeadset className="text-2xl drop-shadow" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <span className="hidden sm:inline">24/7 Support</span>
      </button>

      {/* Modal */}
      <VapiAgentModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
