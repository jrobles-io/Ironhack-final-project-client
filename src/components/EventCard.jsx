import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function EventCard ( { title, description, _id } ) {
  
  return (
    <div className="eventCard card">
      <Link to={`/events/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{description} </p>
    </div>
  );
}

export default EventCard;