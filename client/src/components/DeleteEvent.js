import React from "react"; // Import React
import { useMutation } from "@apollo/client"; // Import useMutation hook from Apollo Client
import { DELETE_EVENT } from "../utils/mutations"; // Import the DELETE_EVENT mutation
import { Button } from "react-bootstrap"; // Import Button component from React Bootstrap

// DeleteEvent component receives an eventId as a prop
const DeleteEvent = ({ eventId }) => {
  // useMutation hook for the DELETE_EVENT mutation
  const [deleteEvent] = useMutation(DELETE_EVENT);

  // Handler for deleting the event
  const handleDeleteEvent = async () => {
    try {
      // Call the deleteEvent mutation with the eventId
      await deleteEvent({
        variables: {
          deleteEventId: eventId, // Ensure this matches the GraphQL mutation variable name
        },
      });
      console.log("Event deleted successfully"); // Log success message
    } catch (err) {
      console.error("Error deleting event:", err); // Log any errors to the console
    }
  };

  return (
    <Button variant="danger" onClick={handleDeleteEvent}>
      Delete Event
    </Button>
  );
};

export default DeleteEvent; // Export the DeleteEvent component
