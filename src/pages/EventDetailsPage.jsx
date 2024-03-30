import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, Link } from "react-router-dom";

import { get } from "../services/authService";
import AddTicket from "../components/AddTicket";
import TicketCard from "../components/TicketCard";

function EventDetailsPage(props) {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  const { user } = useContext(AuthContext);

  const getEvent = () => {
    get(`/events/details/${eventId}`)
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div className="EventDetails">
      {event && (
        <>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p>{event.date}</p>
        </>
      )}

      {user && event && user._id === event.owner && (
        <AddTicket refreshEvent={getEvent} eventId={eventId} />
      )}

      {event &&
        event.tickets.map((ticket) => <TicketCard key={ticket._id} {...ticket} />)}

      <Link to="/events">
        <button>Back to events</button>
      </Link>

      {user && event && user._id === event.owner && (
        <Link to={`/events/edit/${eventId}`}>
          <button>Edit Event</button>
        </Link>
      )}
    </div>
  );
}

export default EventDetailsPage;