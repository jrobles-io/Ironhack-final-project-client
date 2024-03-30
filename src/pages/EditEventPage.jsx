import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { get, put, axiosDelete } from "../services/authService";

function EditEventPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    get(`/events/details/${eventId}`)
      .then((response) => {
        const oneEvent = response.data;
        setTitle(oneEvent.title);
        setDescription(oneEvent.description);
        
        //format date
        const date = new Date(oneEvent.date);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setDate(formattedDate);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, date };

    put(`/events/update/${eventId}`, requestBody)
      .then((response) => {
        navigate(`/events/${eventId}`);
      })
      .catch((error) => console.log(error));
  };

  const deleteEvent = () => {
    axiosDelete(`/events/delete/${eventId}`)
      .then(() => {
        navigate("/events");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditEventPage">
      <h3>Edit the Event</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Date:</label>
        <input
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Update Event</button>
      </form>

      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );
}

export default EditEventPage;