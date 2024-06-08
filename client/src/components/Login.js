import React, { useState } from "react"; // Importing React and useState hook
import { Form, Button, Alert } from "react-bootstrap"; // Importing Bootstrap components for form and button styling
import { useMutation } from "@apollo/client"; // Importing useMutation hook from Apollo Client

import { LOGIN_USER } from "../utils/mutations"; // Importing the LOGIN_USER mutation
import Auth from "../utils/auth"; // Importing Auth utility for authentication

const Login = () => {
  // Set initial form state
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  // Set state for form validation
  const [validated] = useState(false);
  // Set state for alert visibility
  const [showAlert, setShowAlert] = useState(false);

  // Using the login_user mutation and setting it to loginUser
  const [loginUser] = useMutation(LOGIN_USER);

  // Save input value in userFormData
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Execute login mutation
      const response = await loginUser({ variables: { ...userFormData } });

      if (!response) {
        throw new Error("Something went wrong!");
      }

      const { token } = response.data.login;

      // Authenticate the user
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
    <>
      {/* Form component with noValidate and validated props */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Alert component for displaying error messages */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        {/* Email input field */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
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
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
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
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login; // Exporting Login component
