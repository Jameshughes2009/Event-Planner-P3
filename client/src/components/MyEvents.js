import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client"; // Apollo Client hooks for executing GraphQL queries and mutations
import { Link } from "react-router-dom"; // Link component for navigation
import {
  Container,
  Button,
  Card,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"; // Bootstrap components for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome component for icons
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Specific icons from FontAwesome
import { GET_ONE_USER, DELETE_EVENT } from "../utils/queries"; // GraphQL queries and mutations
import Auth from "../utils/auth"; // Authentication utility
import './MyEvents.css'; // Import the CSS file for custom styling

// MyEvents component for displaying and managing user events
const MyEvents = () => {
  const [hover, setHover] = useState(null); // State to manage hover effect on events
  const [userEvents, setUserEvents] = useState([]); // State to store user events
  const userToken = Auth.getProfile(); // Get user token from authentication
  const userId = userToken.data._id; // Extract user ID from the token

  // Function to handle hover effect
  const onHover = (eventId) => {
    setHover(eventId);
  };

  // Function to handle mouse leave event
  const onLeave = () => {
    setHover(null);
  };

  // Execute GET_ONE_USER query to fetch user data and events
  const { loading, error, data, refetch } = useQuery(GET_ONE_USER, {
    variables: { userId: userId },
  });

  // useMutation hook to get the deleteEvent function from the DELETE_EVENT mutation
  const [deleteEvent] = useMutation(DELETE_EVENT);

  // Effect hook to update userEvents state when data is fetched
  useEffect(() => {
    if (data && data.user && data.user.events) {
      setUserEvents(data.user.events);
    }
  }, [data]);

  // Function to handle event deletion
  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent({
        variables: {
          deleteEventId: eventId,
        },
      });
      refetch(); // Refetch user data to update the UI
      console.log("Event deleted successfully");
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  // Display loading state
  if (loading) return <p>Loading...</p>;
  // Display error state
  if (error) return <p>Error: {error.message}</p>;
  // Display no user data state
  if (!data || !data.user) {
    return <p>No user data available</p>;
  }

  const { user } = data; // Extract user data

  return (
    <div className="events-page">
      <Container className="center">
        <div className="mx-auto p-5">
          <h3 style={{ color: "black"}}>Welcome {user.username}!</h3>
          <p style={{ color: "black",}}>To update or delete events, simply hover over the image</p>
          <div className="events-container">
            {userEvents.length > 0 ? (
              <>
                <h4 className="mt-5">Your Upcoming Events:</h4>
                <Row className="d-flex flex-wrap justify-content-start">
                  {userEvents.map((event) => (
                    <Col key={event.id} className="d-flex">
                      <Card
                        onMouseEnter={() => onHover(event.id)}
                        onMouseLeave={onLeave}
                        className="event-card"
                      >
                        <div 
                          className="event-image" 
                          style={{ backgroundImage: event.image ? `url(${event.image})` : undefined }} 
                        />
                        <Card.Body className="card-body">
                          <Card.Title>{event.title}</Card.Title>
                          <Card.Text>{event.description}</Card.Text>
                          <div className="d-flex justify-content-between align-items-center">
                            <Button as={Link} to={`/eventDetails/${event.id}`} variant="primary">
                              More details
                            </Button>
                            {hover === event.id && (
                              <div className="d-flex justify-content-end align-items-center">
                                <Button
                                  variant="link"
                                  as={Link}
                                  to={`/updateEvent/${event.id}`}
                                  className="edit-icon"
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button
                                  variant="link"
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="delete-icon"
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
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
    </div>
  );
};

export default MyEvents;
