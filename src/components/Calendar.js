import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/calendar-events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  

  const handleSaveEvent = async () => {
    const event = {
      date,
      title,
      description,
    };

    try {
      const response = await axios.post('/api/calendar-events', event);
      setEvents([...events, response.data]); // Add the new event to the state
      console.log('Event saved:', response.data);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <div>
      <h2>Select a Date</h2>
      <Calendar onChange={onDateChange} value={date} />
      <p>Selected Date: {date.toDateString()}</p>
      
      <div>
        <h3>Add Event</h3>
        <input 
          type="text" 
          placeholder="Event Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Event Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button onClick={handleSaveEvent}>Save Event</button>
      </div>

      <h3>Events</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.title}</strong> - {event.date}
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCalendar;

