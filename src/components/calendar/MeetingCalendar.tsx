import React, { useState } from 'react';
import FullCalendar, { EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useMeetings } from '../../context/MeetingsContext';

export const MeetingCalendar: React.FC = () => {
  const { confirmedMeetings, addMeetingRequest, meetingRequests } = useMeetings();

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Enter meeting title');
    const proposedBy = prompt('Your name');

    if (title && proposedBy) {
      addMeetingRequest({
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        proposedBy,
        status: 'pending'
      });
      alert('Meeting request sent!');
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    alert(`Meeting: ${event.title}\n${new Date(event.startStr).toLocaleString()}`);
  };

  // Combine confirmed meetings and meeting request events for calendar display
  const events = [
    ...confirmedMeetings.map(m => ({
      id: m.id,
      title: m.title,
      start: m.start,
      end: m.end,
      backgroundColor: '#10b981',
      borderColor: '#059669'
    })),
    ...meetingRequests
      .filter(r => r.status === 'pending')
      .map(r => ({
        id: r.id,
        title: `${r.title} (Pending)`,
        start: r.start,
        end: r.end,
        backgroundColor: '#f59e0b',
        borderColor: '#d97706'
      }))
  ];

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Your Schedule</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        events={events}
        eventClick={handleEventClick}
        height="auto"
      />
    </div>
  );
};

export default MeetingCalendar;
