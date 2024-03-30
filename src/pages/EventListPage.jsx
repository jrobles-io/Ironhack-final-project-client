import { useState, useEffect } from "react";

import { get } from "../services/authService";

import EventCard from "../components/EventCard";
import AddEvent from "../components/AddEvent";



function EventListPage() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    get('/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="EventListPage">
      <AddEvent refreshEvents={getAllEvents} />

      {events.map((event) => (
        <EventCard key={event._id} {...event} />
      ))}
    </div>
  );
}

export default EventListPage;