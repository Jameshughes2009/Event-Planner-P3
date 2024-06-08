import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import './style.css'; // Importing custom CSS for additional styling

function Contact() {
    return (
        <div className="container d-flex flex-column justify-content-center min-vh-100"> {/* Container to center the form vertically and horizontally */}
            <div className="row">
                <div className="col-md-6 offset-md-3"> {/* Centering the column in the middle of the row */}
                    <h1 className="title">Contact</h1> {/* Title for the contact form */}
                    <form
                        action="https://getform.io/f/(customSlugHere)" // The form will submit to this URL
                        method="POST" // Form submission method
                        className="d-flex flex-column" // Flexbox layout to arrange form elements vertically
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            className="inputField glow" // Class names for custom styling
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter Email"
                            className="inputField glow" // Class names for custom styling
                        />
                        <textarea
                            name="message"
                            placeholder="Enter Message (400) Character Max"
                            rows="10"
                            className="textareaField glow" // Class names for custom styling
                        />
                        <button 
                            type="button" // Changing the button type to 'button' instead of 'submit'
                            className="submitButton" // Class name for custom styling
                        >
                            Submit.
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact; // Exporting the Contact component for use in other parts of the application