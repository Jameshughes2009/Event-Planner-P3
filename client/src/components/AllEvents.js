//make sure it titled AllEvents.js
import React from "react";
import { useQuery } from "@apollo/client"; // Importing useQuery hook from Apollo Client for data fetching
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import { GET_ALL_EVENTS } from "../utils/queries"; // Importing the GraphQL query to fetch all events
// import notebookImage from "../assets/note-book-image.jpg"; // Importing an image to be used in the event cards