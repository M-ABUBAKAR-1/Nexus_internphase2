import React from 'react';
import { VideoCallUI } from '../../components/video/VideoCallUI';

export const VideoCallPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Video Calling</h1>
        <p className="text-gray-600">Connect face-to-face with investors or entrepreneurs</p>
      </div>

      <VideoCallUI />
    </div>
  );
};

export default VideoCallPage;
