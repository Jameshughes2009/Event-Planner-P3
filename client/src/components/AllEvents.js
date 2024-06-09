//make sure it titled AllEvents.js
import React from "react";
import { useQuery } from "@apollo/client"; // Importing useQuery hook from Apollo Client for data fetching
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import { GET_ALL_EVENTS } from "../utils/queries"; // Importing the GraphQL query to fetch all events
// import notebookImage from "../assets/note-book-image.jpg"; // Importing an image to be used in the event cards

const AllEvents = () => {
    const { loading, data } = useQuery(GET_ALL_EVENTS); // Using useQuery to fetch events data
  
    if (loading) {
      return <div>Loading events...</div>; // Display a loading message while data is being fetched
    }
  
    const events = data.events; // Extracting events from the fetched data
  
    return (
      <div className="container">
        <h3 className="mb-4">All Events</h3>
        {events.length === 0 ? ( // Checking if there are no events
        <div>No events at the moment. Please check back later.</div> // Changed message when no events are found
    ) : (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {events.map((event) => (
          <div key={event.id} className="col">
            <Link
                to={`/eventDetails/${event.id}`} // Linking to event details page
                style={{ textDecoration: "none", color: "black" }} // Styling the link
              >
                <div className="card h-100">
                  {parseInt(event.date) > new Date().getTime() ? ( // Checking if the event date is in the future
                    <img
                      // src={notebookImage} // Display the event image
                      // className="card-img-top"
                      // alt={event.title}
                    />
                ) : (
                    <div style={{ position: "relative" }}>
                      <img
                        // src={notebookImage} // Display the event image with a dark filter if the event is in the past
                        // className="card-img-top"
                        // alt={event.title}
                        // style={{ filter: "brightness(25%)" }}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 1,
                          color: "white",
                        }}
                        >
                        Event is over
                      </p>
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5> {/* Display event title */}
                    <p className="card-text">{event.description}</p> {/* Display event description */}
                    <div className="mb-1">
                      <span className="fw-bold me-1">Location:</span>
                      {event.location} {/* Display event location */}
                    </div>
                    <div className="mb-1">
                      <span className="fw-bold me-1">Date:</span>
                      {new Date(parseInt(event.date)).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )} {/* Display formatted event date */}
                    </div>
                    <div className="text-muted">
                      {event.user ? "Organized by " + event.user.username : ""} {/* Display event organizer if available */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents; // Exporting the AllEvents component
