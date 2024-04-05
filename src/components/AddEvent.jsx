import { useState } from "react";
import { post } from "../services/authService";
import { fileChange } from "../services/imageUpload";

function AddEvent({ refreshEvents, closeModal }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(""); 
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description,location, date, image };

    post("/events", requestBody)
      .then((response) => {
        // Reset the state
        setImage('')
        setTitle("");
        setDescription("");
        setLocation("");
        setDate("");
        refreshEvents();
        closeModal();
      })
      .catch((error) => console.log(error));
  };

  const handleImages = (e) => {
    setDisabled(true);

    fileChange(e)
    .then((response) => {
      console.log("This is the cloudinary response ===>", response.data)
      setImage(response.data.image);
      setDisabled(false);
    })
    .catch((err) => {
      console.log("Error adding image", err)
      setDisabled(false)
    })
  };

  return (
    <div className="bg-gray-900 shadow-md rounded-lg p-8 mb-6 w-96">
      <h3 className="text-xl font-semibold mb-4 text-white">Add Event</h3>

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
            htmlFor="location"
            className="block text-sm font-medium text-gray-300"
          >
            Location:
          </label>
          <input
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-300"
          >
            Date:
          </label>
          <input
            type="date"
            name="date"
            id="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-300"
          >
            Image:
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImages}
            className="mt-1 block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-gray-800 border border-gray-600 rounded transition ease-in-out m-0 focus:text-gray-300 focus:bg-gray-800 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex justify-between space-x-2 mt-4">
        <button
          type="submit"
          disabled={disabled}
          className="bg-[#25484E] hover:bg-[#54AC8E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Event
        </button>
        <button
          type="button" // Important to specify type="button" to prevent form submission
          onClick={closeModal}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
      </form>
    </div>
  );
}

export default AddEvent;
