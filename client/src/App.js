import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'font-awesome/css/font-awesome.min.css';

import './components/style.css'; // Import custom styles

// Importing components and pages
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyEvents from "./components/MyEvents";
import CreateEvent from "./components/CreateEvent";
import AllEvents from "./components/AllEvents";
import UpdateEvent from "./components/UpdateEvent";
import EventDetails from "./components/EventDetails";

// Setting up HTTP link to GraphQL endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Setting up authorization link to include JWT token in headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Creating Apollo Client instance with authLink and httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Wrapping the application in ApolloProvider to provide Apollo Client to the React component tree
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh">
          <Navbar /> {/* Navbar component */}
          <Routes>
            {/* Define routes for the application */}
            <Route path="/" element={<Home />} /> {/* Home page */}
            <Route path="/myEvents" element={<MyEvents />} /> {/* MyEvents page */}
            <Route path="/createEvent" element={<CreateEvent />} /> {/* CreateEvent page */}
            <Route path="/allEvents" element={<AllEvents />} /> {/* AllEvents page */}
            <Route path="/updateEvent/:eventId" element={<UpdateEvent />} /> {/* UpdateEvent page with eventId parameter */}
            <Route path="/eventDetails/:eventId" element={<EventDetails />} /> {/* EventDetails page with eventId parameter */}
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>} // Fallback route for undefined paths
            />
          </Routes>
          <Footer /> {/* Footer component */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
