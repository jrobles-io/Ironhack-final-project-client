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
      .catch((error) => console.log("ticket creation failed", error));
  };

  return (
    <div className="bg-gray-900 shadow-md rounded-lg p-8 mb-6 w-96">
      <h3 className="text-xl font-semibold mb-4 text-white">Add New Ticket</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300"
          >
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="tier"
            className="block text-sm font-medium text-gray-300"
          >
            Tier:
          </label>
          <select
            name="tier"
            id="tier"
            required
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select Tier --</option>
            <option value="General">General</option>
            <option value="VIP">VIP</option>
            <option value="Backstage">Backstage</option>
            <option value="Complimentary">Complimentary</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-300"
          >
            Amount:
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300"
          >
            Price:
          </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#25484E] hover:bg-[#54AC8E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Ticket
        </button>
      </form>
    </div>
  );
}

export default AddTicket;
