import { useState } from "react";

import { post } from "../services/authService";

function AddEvent({ refreshEvents }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, date };
    
    post('/events', requestBody)
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");
        setDate("");
        refreshEvents();
        console.log()
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="AddEvent">
      <h3>Add Event</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddEvent;