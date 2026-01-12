import React from 'react';
import { MeetingCalendar } from '../../components/calendar/MeetingCalendar';
import { MeetingRequestsList, ConfirmedMeetingsList } from '../../components/calendar/MeetingRequestsList';

export const CalendarPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Scheduling & Calendar</h1>
        <p className="text-gray-600">Manage your availability and meeting requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MeetingCalendar />
        </div>
        <div className="space-y-6">
          <MeetingRequestsList />
        </div>
      </div>

      <div>
        <ConfirmedMeetingsList />
      </div>
    </div>
  );
};

export default CalendarPage;
