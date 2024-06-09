import React, { useState, useEffect } from "react"; // Importing React and necessary hooks
import { useParams, Link } from "react-router-dom"; // Importing routing functionalities
import { useQuery, useMutation } from "@apollo/client"; // Importing Apollo Client hooks

import { GET_ONE_EVENT } from "../utils/queries"; // Importing query to get one event
import { UPDATE_EVENT } from "../utils/mutations"; // Importing mutation to update an event
import { Container, Col, Form, Button, Row, Alert } from "react-bootstrap"; // Importing Bootstrap components for styling

const UpdateEvent = () => {
  const [updateEvent] = useMutation(UPDATE_EVENT); // Defining mutation hook for updating event
  const { eventId } = useParams(); // Extracting eventId from URL parameters

  const [showAlert, setShowAlert] = useState(false); // State to manage the visibility of the alert
  const [alertStatus, setAlertStatus] = useState(null); // State to manage the status of the alert (success or danger)
  const [eventInput, setEventInput] = useState({
    title: "",
    description: "",
    cost: 0,
    location: "",
    date: "",
  }); // State to manage event input values

  const { loading, error, data } = useQuery(GET_ONE_EVENT, {
    variables: { eventId: eventId },
  }); // Query to get event data based on eventId

  // Effect to set event input values when data is loaded
  useEffect(() => {
    if (!loading && data) {
      setEventInput({
        title: data.event.title,
        description: data.event.description,
        cost: data.event.cost,
        location: data.event.location,
        date: data.event.date,
      });
    }
  }, [loading, data]);

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const update = await updateEvent({
        variables: {
          updateEventId: eventId,
          title: eventInput.title,
          description: eventInput.description,
          cost: parseFloat(eventInput.cost),
          location: eventInput.location,
          date: eventInput.date,
        },
      });

      if (!update) {
        setShowAlert(true);
        setAlertStatus("danger");
        throw new Error("Something went wrong!");
      } else {
        setShowAlert(true);
        setAlertStatus("success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showAlert &&
        (alertStatus === "success" ? (
          <Alert variant="success" className="m-0">
            <Alert.Heading className="text-center">
              Success!! Click here to see the latest updates.
            </Alert.Heading>
            <div className="d-flex justify-content-center">
              <Button
                as={Link}
                to={`/eventDetails/${eventId}`}
                variant="outline-success"
              >
                View Your Event
              </Button>
            </div>
          </Alert>
        ) : (
          <Alert variant="danger" className="m-0">
            <Alert.Heading className="text-center">
            There was an error with the update!
            </Alert.Heading>
            <div className="d-flex justify-content-center">
              <Button as={Link} to="/myEvents" variant="outline-danger">
                Return to My Events
              </Button>
            </div>
          </Alert>
        ))}
      <div className="bg-grey p-5">
        <Container>
          <h1>Edit Your Event:</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    name="title"
                    value={eventInput.title}
                    onChange={(e) => {
                      setEventInput({
                        ...eventInput,
                        title: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder={eventInput.title}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description:</Form.Label>
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
                    as="textarea"
                    rows={3}
                    placeholder="Event Description"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Cost:</Form.Label>
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
                    placeholder="Event Cost"
                    step="0.01"
                    min="0"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location:</Form.Label>
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
                    placeholder="Event Location"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date:</Form.Label>
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
                    placeholder="Event Date"
                    required
                  />
                </Form.Group>
                <Button variant="success" type="submit" size="lg">
                  Edit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default UpdateEvent; // Exporting UpdateEvent component
