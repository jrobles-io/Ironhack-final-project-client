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
<div className="flex flex-col items-center bg-black rounded-lg p-10 mb-6 min-h-screen">
  {event && (
    <>
      <h1 className="text-4xl font-bold text-white mb-2 text-center">{event.title}</h1>
      <p className="text-gray-300 text-lg mb-2 text-center">{event.description}</p>
      <p className="text-gray-500 mb-6 text-center">{new Date(event.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</p>
    </>
  )}

  {user && event && user._id === event.owner && (
    <AddTicket refreshEvent={getEvent} eventId={eventId} />
  )}

  <div className="flex flex-wrap justify-center gap-4 mt-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 justify-center">
      {event && event.tickets.map((ticket) => <TicketCard key={ticket._id} {...ticket} />)}
    </div>
  </div>

  <div className="mt-8 flex gap-4">
    <Link to="/events">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back to events</button>
    </Link>
    
    <Link to="/checkout">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Checkout</button>
    </Link>
    
    {user && event && user._id === event.owner && (
      <Link to={`/events/edit/${eventId}`}>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit Event</button>
      </Link>
    )}
  </div>
</div>

  );
}

export default EventDetailsPage;
