import { useState, useEffect, useContext } from "react";

import { get } from "../services/authService";

import EventCard from "../components/EventCard";
import AddEvent from "../components/AddEvent";
import { AuthContext } from "../context/auth.context";

function EventListPage() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getAllEvents = () => {
    get('/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="flex flex-col items-center bg-black rounded-lg p-10 mb-6 min-h-screen">
      {user && user.type === 'ADMIN' && (
        <button
          onClick={() => setShowModal(true)}
          className="mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Event
        </button>
      )}

      {showModal && ( 
          <div className="bg-gray-800 p-5 rounded-lg fixed inset-0 bg-opacity-50 flex justify-center items-center" >
            <AddEvent refreshEvents={getAllEvents} closeModal={handleCloseModal} />
          </div>
  
      )}

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {events.map((event) => (
            <EventCard key={event._id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventListPage;
