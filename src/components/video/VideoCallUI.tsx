import React, { useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Share2 } from 'lucide-react';

export const VideoCallUI: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const startCall = () => {
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsMicOn(true);
    setIsVideoOn(true);
    setIsScreenSharing(false);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  if (!isCallActive) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-200">
        <div className="mb-6">
          <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center">
            <Video size={40} className="text-white" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to connect?</h3>
        <p className="text-gray-600 text-center mb-6 max-w-sm">Start a video call with investors or entrepreneurs to discuss opportunities</p>
        <button
          onClick={startCall}
          className="px-6 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors font-medium flex items-center gap-2"
        >
          <Phone size={20} />
          Start Video Call
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Video Display Area */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
        {/* Main Video Feed */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          {isVideoOn ? (
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl">👨</span>
                </div>
                <p className="text-white font-medium">John Investor</p>
                <p className="text-gray-400 text-sm">Connected</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                <VideoOff size={40} className="text-gray-400" />
              </div>
              <p className="text-white font-medium">John Investor</p>
              <p className="text-gray-400 text-sm">Camera off</p>
            </div>
          )}
        </div>

        {/* Picture-in-Picture (Local Feed) */}
        <div className="absolute bottom-4 right-4 w-24 h-24 bg-gray-800 rounded-lg border-2 border-gray-700 overflow-hidden flex items-center justify-center">
          {isVideoOn ? (
            <div className="text-center">
              <span className="text-2xl">🧑</span>
              <p className="text-white text-xs mt-1">You</p>
            </div>
          ) : (
            <VideoOff size={32} className="text-gray-500" />
          )}
        </div>

        {/* Call Timer */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
          00:05:23
        </div>
      </div>

      {/* Call Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleMic}
          className={`p-4 rounded-full transition-colors ${
            isMicOn
              ? 'bg-gray-600 hover:bg-gray-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={isMicOn ? 'Mute' : 'Unmute'}
        >
          {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-4 rounded-full transition-colors ${
            isVideoOn
              ? 'bg-gray-600 hover:bg-gray-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={isVideoOn ? 'Stop Video' : 'Start Video'}
        >
          {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
        </button>

        <button
          onClick={toggleScreenShare}
          className={`p-4 rounded-full transition-colors ${
            isScreenSharing
              ? 'bg-primary-600 hover:bg-primary-700 text-white'
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
          title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
        >
          <Share2 size={24} />
        </button>

        <button
          onClick={endCall}
          className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
          title="End Call"
        >
          <PhoneOff size={24} />
        </button>
      </div>

      {/* Status Info */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600">Microphone</p>
          <p className="text-sm font-semibold text-gray-900">{isMicOn ? 'On' : 'Off'}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600">Camera</p>
          <p className="text-sm font-semibold text-gray-900">{isVideoOn ? 'On' : 'Off'}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600">Screen Share</p>
          <p className="text-sm font-semibold text-gray-900">{isScreenSharing ? 'Sharing' : 'Off'}</p>
        </div>
      </div>

      {isScreenSharing && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Screen sharing enabled:</strong> Your screen is now visible to the other participant
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoCallUI;
