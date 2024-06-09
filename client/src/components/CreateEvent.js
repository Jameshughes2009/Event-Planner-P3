import React, { useState } from "react"; // Import React and useState hook
import { useMutation } from "@apollo/client"; // Import useMutation hook from Apollo Client
import { CREATE_EVENT } from "../utils/mutations"; // Import the CREATE_EVENT mutation
import { Container, Col, Form, Button, Row, Alert } from "react-bootstrap"; // Import Bootstrap components
import Auth from "../utils/auth"; // Import Auth utility for authentication
import { Link } from "react-router-dom"; // Import Link from React Router

const CreateEvent = () => {
  // useMutation hook for the CREATE_EVENT mutation
  const [createEvent, { error }] = useMutation(CREATE_EVENT);
  
  // State to handle form inputs
  const [eventInput, setEventInput] = useState({
    title: "",
    description: "",
    cost: "",
    location: "",
    date: "",
  });
  
  // State to handle success message visibility
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Get user token and user ID from the Auth utility
  const userToken = Auth.getProfile();
  const userId = userToken.data._id;

  // Handler for form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Call the createEvent mutation with the form data
      await createEvent({
        variables: {
          title: eventInput.title,
          description: eventInput.description,
          cost: parseFloat(eventInput.cost),
          location: eventInput.location,
          date: eventInput.date,
          userId: userId,
        },
      });

      // Reset form inputs after successful event creation
      setEventInput({
        title: "",
        description: "",
        cost: "",
        location: "",
        date: "",
      });

      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide success message after 3 seconds
      }, 3000);
      window.location.reload(); // Refresh the page to update the event list
    } catch (err) {
      console.log(err); // Log any errors to the console
    }
  };

  return (
    <div className="text-light bg-dark p-5">
      <Container>
        <h1>Create Event</h1>
        {showSuccessMessage && ( 
          <Alert variant="success">
            We got your events create!!
          </Alert>
        )}
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control
                name="title"
                value={eventInput.title}
                onChange={(e) =>
                  setEventInput({ ...eventInput, title: e.target.value })
                }
                type="text"
                size="lg"
                placeholder="Event Name"
                required
              />
              <Form.Control
                name="description"
                value={eventInput.description}
                onChange={(e) =>
                  setEventInput({
                    ...eventInput,
                    description: e.target.value,
                  })
                }
                type="text"
                size="lg"
                placeholder="Event Description"
                required
              />
              <Form.Control
                name="cost"
                value={eventInput.cost}
                onChange={(e) =>
                  setEventInput({
                    ...eventInput,
                    cost: e.target.value,
                  })
                }
                type="number"
                size="lg"
                placeholder="Event Cost"
                step="0.01"
                min="0"
                required
              />
              <Form.Control
                name="location"
                value={eventInput.location}
                onChange={(e) =>
                  setEventInput({
                    ...eventInput,
                    location: e.target.value,
                  })
                }
                type="text"
                size="lg"
                placeholder="Event Location"
                required
              />
              <Form.Control
                name="date"
                value={eventInput.date}
                onChange={(e) =>
                  setEventInput({
                    ...eventInput,
                    date: e.target.value,
                  })
                }
                type="datetime-local"
                size="lg"
                placeholder="Event Date"
                required
              />
              <Button type="submit" variant="success" size="lg">
                Create Event
              </Button>
              {/* Button to navigate to My Events */}
              <Button
                as={Link}
                to="/MyEvents"
                variant="primary"
                size="lg"
                className="ms-3"
              >
                My Events
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CreateEvent;
