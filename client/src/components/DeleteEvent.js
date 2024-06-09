import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_EVENT } from "../utils/mutations";
import { Button } from "react-bootstrap";

const DeleteEvent = ({ eventId }) => {
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent({
        variables: {
          deleteEventId: eventId,
        },
      });
      console.log("Event deleted successfully");
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <Button variant="danger" onClick={handleDeleteEvent}>
      Delete Event
    </Button>
  );
};

export default DeleteEvent;