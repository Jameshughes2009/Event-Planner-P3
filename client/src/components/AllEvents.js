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