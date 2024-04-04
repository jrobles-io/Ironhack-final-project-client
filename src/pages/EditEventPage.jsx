import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fileChange } from "../services/imageUpload";

import { get, put, axiosDelete } from "../services/authService";

function EditEventPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState('')

  const [disabled, setDisabled] = useState(false)

  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    get(`/events/details/${eventId}`)
      .then((response) => {
        const oneEvent = response.data;
        setTitle(oneEvent.title);
        setDescription(oneEvent.description);
        setImage(oneEvent.image)

        //format date
        const date = new Date(oneEvent.date);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        setDate(formattedDate);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, date, image };

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

  const handleImage = (e) => {
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
    <div className="flex flex-col justify-center items-center h-full p-10 bg-gray-900 text-white min-h-screen">
      <h3 className="text-xl font-bold mb-6">Edit the Event</h3>

      <form className="w-full max-w-lg space-y-4" onSubmit={handleFormSubmit}>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-600 rounded shadow appearance-none text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-600 rounded shadow appearance-none text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Date:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-600 rounded shadow appearance-none text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
            onChange={handleImage}
            className="mt-1 block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-gray-800 border border-gray-600 rounded transition ease-in-out m-0 focus:text-gray-300 focus:bg-gray-800 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            disabled={disabled}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Event
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={deleteEvent}
          >
            Delete Event
          </button>

        </div>
      </form>
    </div>
  );
}

export default EditEventPage;
