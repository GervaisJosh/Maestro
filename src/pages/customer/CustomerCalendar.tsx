import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';
import { useCalendar } from '../../contexts/CalendarContext';

const CustomerCalendar = () => {
  const { events } = useCalendar();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const renderCalendarDays = () => {
    const days = [];
    const monthEvents = events.filter(event => 
      event.date.getMonth() === currentDate.getMonth() && 
      event.date.getFullYear() === currentDate.getFullYear() &&
      event.type === 'event'
    );

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-800 border border-gray-700"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = monthEvents.filter(event => event.date.getDate() === day);

      days.push(
        <div key={day} className="h-24 bg-gray-800 border border-gray-700 p-1 overflow-hidden">
          <div className="font-bold mb-1">{day}</div>
          {dayEvents.map(event => (
            <div 
              key={event.id} 
              className="text-xs bg-green-800 rounded p-1 mb-1 truncate cursor-pointer"
              onClick={() => handleEventClick(event)}
            >
              <CalendarIcon className="inline-block h-3 w-3 mr-1" />
              {event.title}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-6 ml-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Upcoming Events</h1>
        <div className="flex items-center space-x-4">
          <button onClick={prevMonth} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={nextMonth} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
              <button onClick={() => setShowEventDetails(false)} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="mb-2"><strong>Date:</strong> {selectedEvent.date.toLocaleDateString()}</p>
            <p className="mb-2"><strong>Time:</strong> {selectedEvent.timeRange}</p>
            <p className="mb-4"><strong>Description:</strong> {selectedEvent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCalendar;