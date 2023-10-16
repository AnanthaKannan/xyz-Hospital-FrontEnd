/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Calendar as CalenderApp, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: 'Sree',
    id: 1,
    start: new Date(), // The current date and time
    end: new Date().setHours(23, 0, 0, 0), // Today at 11:00 PM
  },
  {
    title: 'Event 2',
    id: 2,
    start: new Date(), // The current date and time
    end: new Date().setHours(23, 0, 0, 0), // Today at 11:00 PM
  },
  {
    title: 'Event 3',
    id: 3,
    start: new Date(), // The current date and time
    end: new Date().setHours(23, 0, 0, 0), // Today at 11:00 PM
  },
  {
    title: 'Event 4',
    id: 4,
    start: new Date(), // The current date and time
    end: new Date().setHours(23, 0, 0, 0), // Today at 11:00 PM
  },
  {
    title: 'Event 5',
    id: 5,
    start: new Date(), // The current date and time
    end: new Date().setHours(23, 0, 0, 0), // Today at 11:00 PM
  },
  // Add more events as needed
];

export const Calendar = () => {
  const [currentView, setCurrentView] = useState('day'); // Default view

  const handleViewChange = (view) => {
    // Add your code to handle the view change here
    console.log('view', view);
    setCurrentView(view);
  };

  const handleEventClick = (event) => {
    // Add your code to handle the event click here
    console.log('Event clicked:', event);
    // You can perform any desired action with the event data
  };

  const handleNavigate = (newDate, view, action) => {
    // Add your code to handle navigation here
    console.log('Navigated to:', newDate);
    console.log('View:', view);
    console.log('Action:', action);
    // You can perform any desired action with the navigation data
  };

  const handleSlotSelect = (slotInfo) => {
    // Add your code to handle the slot select here
    console.log('Selected slot:', slotInfo);
    // You can perform any desired action with the selected slot data
  };

  return (
    <div className="calendar-container">
      <CalenderApp
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        onNavigate={handleNavigate}
        onSelectSlot={handleSlotSelect} // Call the function on slot select
        onView={handleViewChange} // Call the function on view change
        view={currentView} // Set the view to control the default view
      />
    </div>
  );
};

export default Calendar;
