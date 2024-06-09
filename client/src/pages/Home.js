import Contact from "../components/Contacts"; // Importing the Contact component
import "../index.css"; // Importing the main CSS file for styling
// import eventImage from "../assets/event.jpg"; // Importing an event image (not used in this code snippet but included for reference)

// Donation component to display donation information and button
function Donation() {
  return (
    <div className="donation-container">
      <h2 className="donation-heading">Donation</h2>
      <p> For Future work we have added this donation section</p>
      <button className="donation-button">Donate</button>
    </div>
  );
}

// Home component to display the home page
const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome, New User! Please enjoy using our application.</h1>
      <div className="home-content">
        <p>
        Our platform makes managing your upcoming events a breeze. With everything at your fingertips, you can easily update and customize your events with just a few clicks. We appreciate you choosing us for your event planning needs and are confident our platform will simplify the process for you. If you have any questions or need help, feel free to reach out. We're always here to assist you!
        </p>
      </div>
      <div className="container">
        {/* Rendering the Contact and Donation components */}
        <Contact />
        <Donation />
      </div>
    </div>
  );
};

export default Home; // Exporting the Home component
