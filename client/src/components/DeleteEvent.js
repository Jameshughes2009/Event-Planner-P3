import React from "react";
import { useMutation } from "@apollo/client"; // Apollo Client hook for executing GraphQL mutations
import { DELETE_EVENT } from "../utils/mutations"; // GraphQL mutation for deleting an event
import { Button } from "react-bootstrap"; // Button component from React Bootstrap for styling

// DeleteEvent component to handle event deletion
const DeleteEvent = ({ eventId }) => {
  // useMutation hook to get the deleteEvent function from the DELETE_EVENT mutation
  const [deleteEvent] = useMutation(DELETE_EVENT);

  // Function to handle the event deletion process
  const handleDeleteEvent = async () => {
    try {
      // Execute the deleteEvent mutation with the eventId as a variable
      await deleteEvent({
        variables: {
          deleteEventId: eventId,
        },
      });
      console.log("Event deleted successfully"); // Log success message
    } catch (err) {
      console.error("Error deleting event:", err); // Log any error that occurs
    }
  };

  // Return a Bootstrap Button with an onClick handler to delete the event
  return (
    <Button variant="danger" onClick={handleDeleteEvent}>
      Delete Event
    </Button>
  );
};

export default DeleteEvent;
