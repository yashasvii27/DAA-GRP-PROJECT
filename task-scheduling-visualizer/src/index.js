/**
 * ============================================
 * TASK SCHEDULING VISUALIZER - ENTRY POINT
 * ============================================
 * 
 * DAA Project: Greedy Task Scheduling Algorithm
 * 
 * This is the main entry point of the React application.
 * We use React.createElement instead of JSX as per requirements.
 * 
 * Author: DAA Student Project
 * ============================================
 */

// Import React and ReactDOM
const React = require('react');
const ReactDOM = require('react-dom/client');

// Import BrowserRouter for routing
const { BrowserRouter } = require('react-router-dom');

// Import main App component
const App = require('./App');

// Import global styles
require('./styles/styles.css');

/**
 * Root element where React app will be mounted
 */
const rootElement = document.getElementById('root');

/**
 * Create React root using React 18's createRoot API
 */
const root = ReactDOM.createRoot(rootElement);

/**
 * Render the application
 * 
 * Structure:
 * - BrowserRouter wraps the entire app for client-side routing
 * - App component contains route definitions
 */
root.render(
    React.createElement(
        React.StrictMode,
        null,
        React.createElement(
            BrowserRouter,
            null,
            React.createElement(App)
        )
    )
);
