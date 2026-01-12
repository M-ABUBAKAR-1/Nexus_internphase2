import React, { createContext, useContext, useState } from 'react';

export interface MeetingRequest {
  id: string;
  title: string;
  start: string;
  end: string;
  proposedBy: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
}

export interface ConfirmedMeeting {
  id: string;
  title: string;
  start: string;
  end: string;
  participants: string[];
}

interface MeetingsContextType {
  meetingRequests: MeetingRequest[];
  confirmedMeetings: ConfirmedMeeting[];
  addMeetingRequest: (request: MeetingRequest) => void;
  respondToRequest: (id: string, status: 'accepted' | 'declined') => void;
  deleteMeeting: (id: string) => void;
}

const MeetingsContext = createContext<MeetingsContextType | undefined>(undefined);

export const MeetingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meetingRequests, setMeetingRequests] = useState<MeetingRequest[]>([
    {
      id: '1',
      title: 'Intro Call',
      start: new Date().toISOString().slice(0, 16),
      end: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
      proposedBy: 'John Doe',
      status: 'pending'
    }
  ]);

  const [confirmedMeetings, setConfirmedMeetings] = useState<ConfirmedMeeting[]>([
    {
      id: 'c1',
      title: 'Series A Discussion',
      start: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
      end: new Date(Date.now() + 90000000).toISOString().slice(0, 16),
      participants: ['John Doe', 'Jane Smith']
    }
  ]);

  const addMeetingRequest = (request: MeetingRequest) => {
    setMeetingRequests(prev => [...prev, request]);
  };

  const respondToRequest = (id: string, status: 'accepted' | 'declined') => {
    setMeetingRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status } : req
      )
    );

    if (status === 'accepted') {
      const req = meetingRequests.find(r => r.id === id);
      if (req) {
        setConfirmedMeetings(prev => [...prev, {
          id: `c${Date.now()}`,
          title: req.title,
          start: req.start,
          end: req.end,
          participants: [req.proposedBy]
        }]);
      }
    }
  };

  const deleteMeeting = (id: string) => {
    setConfirmedMeetings(prev => prev.filter(m => m.id !== id));
  };

  return (
    <MeetingsContext.Provider value={{ meetingRequests, confirmedMeetings, addMeetingRequest, respondToRequest, deleteMeeting }}>
      {children}
    </MeetingsContext.Provider>
  );
};

export const useMeetings = () => {
  const context = useContext(MeetingsContext);
  if (!context) {
    throw new Error('useMeetings must be used within MeetingsProvider');
  }
  return context;
};
