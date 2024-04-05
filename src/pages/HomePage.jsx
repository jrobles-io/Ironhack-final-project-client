import splashImage from '../assets/splash-page.webp'

function HomePage() {
  const sectionStyle = {
    width: "100%",
    height: "calc(100vh - 40px)", // Adjusted height to account for the padding
    backgroundImage: `url(${splashImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };

  return (
    <div style={sectionStyle} className="flex flex-col items-center h-full p-10">
      <h1 className="text-white text-4xl font-bold">Early Bird Tickets</h1>
    </div>
  );
}

export default HomePage;

