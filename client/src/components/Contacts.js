import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import './style.css'; // Importing custom CSS for additional styling
import './contact.css'; // Importing additional custom CSS for the contact form

// Contact component for the contact form page
function Contact() {
    return (
        // Main container with flex properties to center content vertically
        <div className="container d-flex flex-column justify-content-center min-vh-100">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {/* Title of the contact page */}
                    <h1 className="title">Contact</h1>
                    {/* Contact form with POST method and Getform action URL */}
                    <form
                        action="https://getform.io/f/(customSlugHere)" // Replace with your Getform URL slug
                        method="POST"
                        className="d-flex flex-column"
                    >
                        {/* Name field */}
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Name"
                            className="inputField glow" // Custom CSS class for styling
                            required // HTML5 validation to make the field required
                        />
                        {/* Email field */}
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            className="inputField glow" // Custom CSS class for styling
                            required // HTML5 validation to make the field required
                        />
                        {/* Message field */}
                        <label htmlFor="message">Message (400 Character Max)</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Enter Message"
                            rows="5"
                            maxLength="400" // Maximum character limit for the message
                            className="textareaField glow" // Custom CSS class for styling
                            required // HTML5 validation to make the field required
                        />
                        {/* Submit button */}
                        <button 
                            type="submit"
                            className="submitButton" // Custom CSS class for styling
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
