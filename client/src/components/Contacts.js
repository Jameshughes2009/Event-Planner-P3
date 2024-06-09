import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import './style.css'; // Importing custom CSS for additional styling

function Contact() {
    return (
        <div className="container d-flex flex-column justify-content-center min-vh-100">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="title">Contact</h1>
                    <form
                        action="https://getform.io/f/(customSlugHere)"
                        method="POST"
                        className="d-flex flex-column"
                    >
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Name"
                            className="inputField glow"
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            className="inputField glow"
                            required
                        />
                        <label htmlFor="message">Message (400 Character Max)</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Enter Message"
                            rows="5"
                            maxLength="400"
                            className="textareaField glow"
                            required
                        />
                        <button 
                            type="submit"
                            className="submitButton"
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