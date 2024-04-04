import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function EventCard ( { title, description, _id, image } ) {
  
  return (
<div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
  <Link to={`/events/${_id}`} className="block hover:underline">
    <img src={image} alt={title} className="w-full h-48 object-cover" />

    <div className="p-5">
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm truncate">{description}</p>
    </div>
  </Link>
</div>

  );
}

export default EventCard;