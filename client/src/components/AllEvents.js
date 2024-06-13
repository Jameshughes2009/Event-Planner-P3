import React from "react";
import { useQuery } from "@apollo/client"; // Apollo Client hook for executing GraphQL queries
import { Link } from "react-router-dom"; // Link component for navigation
import { GET_ALL_EVENTS } from "../utils/queries"; // GraphQL query to fetch all events

// AllEvents component to display a list of all events
const AllEvents = () => {
  // Execute the GET_ALL_EVENTS query
  const { loading, data } = useQuery(GET_ALL_EVENTS);

  // Display a loading message while the query is in progress
  if (loading) {
    return <div>Loading events...</div>;
  }

  // Extract events data from the query result
  const events = data.events;

  return (
    <div className="all-events-page">
      <div className="container">
        <h3 className="mb-4">All Events</h3>
        {/* Check if there are no events and display a message accordingly */}
        {events.length === 0 ? (
          <div>No events at the moment. Please check back later.</div>
        ) : (
          // Display a grid of event cards if there are events
          <div className="all-events-container row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {events.map((event) => (
              <div key={event.id} className="col">
                <Link
                  to={`/eventDetails/${event.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="card event-card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text">{event.description}</p>
                      <div className="mb-1">
                        <span className="fw-bold me-1">Location:</span>
                        {event.location}
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
                        )}
                      </div>
                      <div className="text-muted">
                        {event.user ? "Organized by " + event.user.username : ""}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
