/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaPhoneSlash, FaPhone } from 'react-icons/fa';
import Vapi from '@vapi-ai/web';
import Image from 'next/image';

interface VapiAgentModalProps {
  open: boolean;
  onClose: () => void;
}

interface TranscriptMessage {
  role: 'user' | 'assistant';
  content: string;
}

const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY as string;
const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID as string;

export default function VapiAgentModal({ open, onClose }: VapiAgentModalProps) {
  const vapiRef = useRef<any>(null);
  const [callActive, setCallActive] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Only create Vapi instance and listeners once
  useEffect(() => {
    if (!apiKey || !assistantId) {
      console.error('Vapi API key or Assistant ID not configured');
      return;
    }

    const vapiInstance = new (Vapi as any)(apiKey);
    vapiRef.current = vapiInstance;

    const handleCallStart = () => {
      setCallActive(true);
      setIsConnecting(false);
    };

    const handleCallEnd = () => {
      setCallActive(false);
      setTranscript([]);
      setIsConnecting(false);
    };

    const handleMessage = (message: { type: string; role: 'user' | 'assistant'; transcript: string }) => {
      if (message.type === 'transcript') {
        setTranscript((prev) => [...prev, { role: message.role, content: message.transcript }]);
        setIsConnecting(false);
      }
    };

    const handleError = () => {
      setCallActive(false);
      setIsConnecting(false);
    };

    vapiInstance.on('call-start', handleCallStart);
    vapiInstance.on('call-end', handleCallEnd);
    vapiInstance.on('message', handleMessage);
    vapiInstance.on('error', handleError);

    return () => {
      vapiInstance.off('call-start', handleCallStart);
      vapiInstance.off('call-end', handleCallEnd);
      vapiInstance.off('message', handleMessage);
      vapiInstance.off('error', handleError);
      vapiInstance.stop();
      vapiRef.current = null;
    };
  }, []);

  // Start/stop call on modal open/close
  useEffect(() => {
    const vapi = vapiRef.current;
    if (open) {
      setIsConnecting(true);
      vapi?.stop();
      vapi?.start(assistantId);
    } else {
      vapi?.stop();
      setCallActive(false);
      setTranscript([]);
      setIsConnecting(false);
    }
  }, [open]);

  // Play/stop ring sound while connecting
  useEffect(() => {
    if (isConnecting && open) {
      audioRef.current?.play().catch(() => {});
    } else {
      audioRef.current?.pause();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  }, [isConnecting, open]);

  const handleDisconnect = () => {
    const vapi = vapiRef.current as any;
    if (vapi) vapi.stop();
    setCallActive(false);
    setTranscript([]);
    setIsConnecting(false);
    onClose();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleDisconnect}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all border-2 border-blue-600">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-emerald-600">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                    <FaPhone className="text-blue-600 text-lg" />
                  </div>
                  <Dialog.Title as="h3" className="text-lg font-bold text-white">
                    Dinar Exchange 24/7 Support Assistant
                  </Dialog.Title>
                </div>

                {/* Transcript/chat area */}
                <div className="px-6 py-4 h-64 overflow-y-auto bg-blue-50 flex flex-col items-center justify-center">
                  {isConnecting && transcript.length === 0 && !callActive && (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <span className="relative flex h-16 w-16 mb-4">
                        <span className="animate-spin absolute inline-flex h-full w-full rounded-full border-4 border-blue-600 border-t-transparent"></span>
                        <span className="relative flex items-center justify-center h-16 w-16">
                          <FaPhone className="text-emerald-600 text-4xl" />
                        </span>
                      </span>
                      <span className="text-blue-600 font-semibold">Connecting to Dinar Exchange Assistant...</span>
                      <audio ref={audioRef} src="/ring.mp3" loop preload="auto" />
                    </div>
                  )}
                  {!isConnecting && transcript.length === 0 && (
                    <div className="text-center text-blue-600 opacity-60 mt-16">Waiting for conversation...</div>
                  )}
                  {transcript.map((msg, idx) => (
                    <div key={idx} className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`px-4 py-2 rounded-xl max-w-[80%] text-sm ${
                        msg.role === 'user'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-blue-600 border border-blue-600'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={transcriptEndRef} />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between px-6 py-4 bg-blue-100 border-t border-blue-600">
                  <span className={`font-semibold ${callActive ? 'text-green-600' : 'text-red-600'}`}>
                    {callActive ? 'Call Active' : 'Call Ended'}
                  </span>
                  <button
                    onClick={handleDisconnect}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-bold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <FaPhoneSlash /> Disconnect
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
