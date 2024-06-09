import React from 'react'; // Import the React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering React components
import App from './App'; // Import the main App component
import './index.css'; // Import global CSS styles

// Uncomment the next line to enable reporting of web vitals
// import report from './reportWebVitals';

const rootElement = document.getElementById('root'); // Get the root DOM element
const root = ReactDOM.createRoot(rootElement); // Create a root for React rendering

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // Render the App component within React.StrictMode for highlighting potential issues
