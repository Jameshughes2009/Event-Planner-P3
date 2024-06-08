import React, { useState } from "react"; // Importing React and useState hook
import { Form, Button, Alert } from "react-bootstrap"; // Importing Bootstrap components for form and button styling
import { useMutation } from "@apollo/client"; // Importing useMutation hook from Apollo Client

import { ADD_USER } from "../utils/mutations"; // Importing the ADD_USER mutation
import Auth from "../utils/auth"; // Importing Auth utility for authentication

const Signup = () => {
  // State to manage form data
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State for form validation
  const [validated] = useState(false);
  // State for showing alert
  const [showAlert, setShowAlert] = useState(false);

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Mutation hook for adding a user
  const [addUser] = useMutation(ADD_USER);

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Check if form is valid
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Execute the addUser mutation
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }

      const token = data.createUser.token;

      // Log in the user using the Auth utility
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true); // Show alert if there's an error
    }

    // Reset form data
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Form
      id="signup-form"
      className="chess-signup-form"
      noValidate
      validated={validated}
      onSubmit={handleFormSubmit}
    >
      {/* Alert component for displaying error messages */}
      <Alert
        dismissible
        onClose={() => setShowAlert(false)}
        show={showAlert}
        variant="danger"
      >
        There was an issue with your signup!
      </Alert>

      {/* Username input field */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="username" className="form-label">
          Username:
        </Form.Label>
        <Form.Control
          type="text"
          className="form-control"
          id="username"
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
          value={userFormData.username}
          required
        />
        <Form.Control.Feedback type="invalid">
          Username is required!
        </Form.Control.Feedback>
      </Form.Group>

      {/* Email input field */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email" className="form-label">
          Email:
        </Form.Label>
        <Form.Control
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        <Form.Control.Feedback type="invalid">
          Email is required!
        </Form.Control.Feedback>
      </Form.Group>

      {/* Password input field */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="password" className="form-label">
          Password:
        </Form.Label>
        <Form.Control
          type="password"
          className="form-control"
          id="password"
          placeholder="Password must be over (8) Characters long"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
        <Form.Control.Feedback type="invalid">
          Password is required!
        </Form.Control.Feedback>
      </Form.Group>

      {/* Submit button */}
      <Button type="submit" className="btn btn-primary">
        Sign Up
      </Button>
    </Form>
  );
};

export default Signup; // Exporting Signup component
