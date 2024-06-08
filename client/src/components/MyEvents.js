import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect hooks
import { useQuery, useMutation } from "@apollo/client"; // Import useQuery and useMutation hooks from Apollo Client
import { Link } from "react-router-dom"; // Import Link from React Router
import {
  Container,
  Button,
  Card,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"; // Import Bootstrap components
import { GET_ONE_USER, DELETE_EVENT } from "../utils/queries"; // Import GraphQL queries and mutations
import Auth from "../utils/auth"; // Import Auth utility for authentication

const MyEvents = () => {
  const [hover, setHover] = useState(null); // State to track hover effect on events
  const [userEvents, setUserEvents] = useState([]); // State to store user events
  const userToken = Auth.getProfile(); // Get user token from Auth utility
  const userId = userToken.data._id; // Extract user ID from token

  // Function to handle mouse hover over an event card
  const onHover = (eventId) => {
    setHover(eventId);
  };

  // Function to handle mouse leave from an event card
  const onLeave = () => {
    setHover(null);
  };

  // useQuery hook to fetch user data with events
  const { loading, error, data, refetch } = useQuery(GET_ONE_USER, {
    variables: { userId: userId },
  });

  // useMutation hook for the DELETE_EVENT mutation
  const [deleteEvent] = useMutation(DELETE_EVENT);

  // useEffect to update userEvents state when data is fetched
  useEffect(() => {
    if (data && data.user && data.user.events) {
      setUserEvents(data.user.events);
    }
  }, [data]);

  // Handler to delete an event
  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent({
        variables: {
          deleteEventId: eventId,
        },
      });
      refetch(); // Refetch data to update the UI
      console.log("Event deleted successfully");
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.user) {
    return <p>No user data available</p>;
  }

  const { user } = data;

  // Styles for the hover effect on event cards
  const eventHoverStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "40%",
    zIndex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Container className="center">
      <div className="mx-auto p-5">
        <h3>Welcome {user.username}!</h3>
        <div>
          {userEvents.length > 0 ? (
            <>
              <h4 className="mt-5">Your Upcoming Events:</h4>
              <p>To update or delete events, simply hover over the image</p>
              <Container>
                <Row xs={1} md={2} lg={3} className="g-4">
                  {userEvents.map((event) => (
                    <Col key={event.id}>
                      <Card
                        onMouseEnter={() => onHover(event.id)}
                        onMouseLeave={onLeave}
                        style={{ width: "18rem" }}
                      >
                        {parseInt(event.date) > new Date().getTime() ? (
                          <img />
                        ) : (
                          <div style={{ position: "relative" }}>
                            <img style={{ filter: "brightness(25%)" }} />
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
                              This event has ended
                            </p>
                          </div>
                        )}
                        {hover === event.id && (
                          <div style={eventHoverStyle}>
                            <Button
                              variant="link"
                              as={Link}
                              to={`/updateEvent/${event.id}`}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              Delete Event
                            </Button>
                          </div>
                        )}
                        <Card.Body>
                          <Card.Title>{event.title}</Card.Title>
                          <Card.Text>{event.description}</Card.Text>
                          <Button
                            as={Link}
                            to={`/eventDetails/${event.id}`}
                            variant="primary"
                          >
                            More details
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            </>
          ) : (
            <>
              <h4 className="mt-5">No events created yet!</h4>
              <p>Click the + icon at the bottom right to add a new event.</p>
            </>
          )}
        </div>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-disabled">Create New Event!</Tooltip>}
        >
          <Button
            as={Link}
            to="/createEvent"
            variant="primary"
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              bottom: "100px",
              right: "100px",
              width: "50px",
              height: "50px",
            }}
            key="addEventBtn"
            onMouseEnter={() => onHover("addEventBtn")}
            onMouseLeave={onLeave}
          >
            +
          </Button>
        </OverlayTrigger>
      </div>
    </Container>
  );
};

export default MyEvents; // Export the MyEvents component
