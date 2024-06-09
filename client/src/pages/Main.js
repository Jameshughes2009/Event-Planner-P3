import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/css/index.css"; // Import custom CSS for the dashboard
import "/js/delete-post.js"; // Import JavaScript for deleting posts
import "/js/login.js"; // Import JavaScript for login functionality
import "/js/logout.js"; // Import JavaScript for logout functionality
import "/js/new-post.js"; // Import JavaScript for creating new posts
import "/js/signup.js"; // Import JavaScript for signup functionality
import "/js/edit-post.js"; // Import JavaScript for editing posts
import "/js/new-comment.js"; // Import JavaScript for adding new comments
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript bundle


const Main = ({ loggedIn, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Event Planner</title>
      </head>
      <body className="bg-dark text-white">
        <header>
          {/* Navigation bar */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand fs-4" href="/">Event Planner</a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link fs-6" href="/">Home</a>
                  </li>
                  {/* Conditional rendering based on login status */}
                  {loggedIn ? (
                    <>
                      <li className="nav-item">
                        <a className="nav-link fs-6" href="/dashboard">Dashboard</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link fs-6" href="#" id="chess-logout">Logout</a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <a className="nav-link fs-6" href="/login">Login</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link fs-6" href="/signup">Sign Up</a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </header>
        {/* Main content container */}
        <div className="container mt-4">{children}</div>
        {/* Footer */}
        <footer className="bg-dark text-white py-3" style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <h5 className="fs-6">&copy; Designed by Hement & James</h5>
                <h6 className="fs-6">&copy; 2024 All Rights Reserved.</h6>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default Main;