function TicketCard({ title, description, amount, price }) {
    return (
      <div className="TicketCard card">
        <h3>{title}</h3>
        <h4>Description:</h4>
        <p>{description}</p>
        <h4>Amount:</h4>
        <p>{amount}</p>
        <h4>Price:</h4>
        <p>{`$ ${price}`}</p>
      </div>
    );
  }
  
  export default TicketCard;
  
  