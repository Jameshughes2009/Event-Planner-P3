import React from "react"; // Importing React library
import "./homepage.css;"

// Homepage component that takes posts and format_date as props
const Homepage = ({ posts, format_date }) => {
  return (
    <main className="container mt-5"> {/* Main container with top margin */}
      <h1 className="mb-4 text-white">Event-Planner-P3</h1> {/* Page title */}
      <div className="row"> {/* Bootstrap row to arrange cards in a grid */}
        {posts.map((post) => (
          <div className="col-md-4" key={post.id}> {/* Bootstrap column with medium breakpoint */}
            <div className="card mb-3"> {/* Bootstrap card with bottom margin */}
              <div className="card-header bg-warning"> {/* Card header with warning background color */}
                <h2 className="card-title">
                  <a href={`/post/${post.id}`} className="text-dark"> {/* Link to the post detail page */}
                    {post.title}
                  </a>
                </h2>
              </div>
              <div className="card-body text-dark"> {/* Card body with dark text color */}
                <p>
                  Created by: {post.user.username} Date:{" "} {/* Displaying post creator's username and creation date */}
                  {format_date(post.createdAt)} {/* Formatting the post creation date */}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Homepage; // Exporting the Homepage component
