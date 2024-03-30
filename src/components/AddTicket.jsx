import { useState } from "react";

import { post } from "../services/authService";

function AddTicket({ refreshEvent, eventId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tier, setTier] = useState(""); 
  const [amount, setAmount] = useState(""); 
  const [price, setPrice] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // We need the event id when creating the new ticket
    // Create an object representing the body of the POST request
    const requestBody = { title, description, tier, amount, price, eventId };

    post(`/tickets`, requestBody) ///${eventId}
      .then((response) => {
        // Reset the state to clear the inputs
        setTitle("");
        setDescription("");
        setTier("");
        setAmount("");
        setPrice("");
        
        // Invoke the callback function coming through the props
        // from the EventDetailsPage, to refresh the event details
        refreshEvent();
      })
      .catch((error) => console.log('ticket creation failed', error));
  };

  return (
    <div className="AddTicket">
      <h3>Add New Ticket</h3>

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

        <label>Tier:</label>
        <select
            type="text"
            name="tier"
            required
            value={tier}
            onChange={(e) => setTier(e.target.value)}
        >
            <option value="">-- Select Tier --</option>
            <option value="General">General</option>
            <option value="VIP">VIP</option>
            <option value="Backstage">Backstage</option>
            <option value="Complimentary">Complimentary</option>
        </select>
        
        <label>Amount:</label>
        <input
            type="number"
            name="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />    

        <label>Price:</label>
        <input
            type="number"
            name="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />      


        <button type="submit">Add Ticket</button>
      </form>
    </div>
  );
}

export default AddTicket;