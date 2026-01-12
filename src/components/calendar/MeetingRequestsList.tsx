import React from 'react';
import { useMeetings } from '../../context/MeetingsContext';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export const MeetingRequestsList: React.FC = () => {
  const { meetingRequests, respondToRequest } = useMeetings();

  const pendingRequests = meetingRequests.filter(r => r.status === 'pending');

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Meeting Requests</h3>
      {pendingRequests.length === 0 ? (
        <p className="text-gray-500">No pending meeting requests</p>
      ) : (
        <div className="space-y-4">
          {pendingRequests.map(req => (
            <div key={req.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{req.title}</h4>
                  <p className="text-sm text-gray-600">From: {req.proposedBy}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(req.start).toLocaleDateString()} at {new Date(req.start).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => respondToRequest(req.id, 'accepted')}
                    className="flex items-center gap-1 px-3 py-2 bg-success-50 text-success-700 rounded-md hover:bg-success-100 transition-colors text-sm font-medium"
                  >
                    <CheckCircle size={16} />
                    Accept
                  </button>
                  <button
                    onClick={() => respondToRequest(req.id, 'declined')}
                    className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    <XCircle size={16} />
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ConfirmedMeetingsList: React.FC = () => {
  const { confirmedMeetings, deleteMeeting } = useMeetings();

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Confirmed Meetings</h3>
      {confirmedMeetings.length === 0 ? (
        <p className="text-gray-500">No confirmed meetings</p>
      ) : (
        <div className="space-y-3">
          {confirmedMeetings.map(meeting => (
            <div key={meeting.id} className="flex items-center justify-between border border-gray-200 rounded-md p-3">
              <div className="flex items-center gap-3">
                <Clock className="text-success-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900">{meeting.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(meeting.start).toLocaleDateString()} at {new Date(meeting.start).toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-gray-600">With: {meeting.participants.join(', ')}</p>
                </div>
              </div>
              <button
                onClick={() => deleteMeeting(meeting.id)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
