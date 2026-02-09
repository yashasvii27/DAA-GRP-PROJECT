/**
 * ============================================
 * APP.JS - MAIN APPLICATION COMPONENT
 * ============================================
 * 
 * This component sets up the routing structure for the application.
 * Uses React Router v6 without JSX syntax.
 * 
 * Routes:
 * - "/" → Dashboard Page (Algorithm explanation)
 * - "/visualizer" → Visualizer Page (Interactive visualization)
 * 
 * ============================================
 */

const React = require('react');
const { Routes, Route } = require('react-router-dom');

// Import page components
const Header = require('./components/Header/Header');
const Dashboard = require('./components/Dashboard/Dashboard');
const Visualizer = require('./components/Visualizer/Visualizer');

/**
 * App Component - Root component of the application
 * 
 * This component:
 * 1. Renders a persistent Header across all pages
 * 2. Defines route mappings for different pages
 * 3. Provides the main layout structure
 */
function App() {
    return React.createElement(
        'div',
        { className: 'app-container' },
        
        // Header component - always visible
        React.createElement(Header),
        
        // Main content area with routes
        React.createElement(
            'main',
            { className: 'main-content' },
            
            // Routes definition
            React.createElement(
                Routes,
                null,
                
                // Dashboard Route (Home page)
                React.createElement(Route, {
                    path: '/',
                    element: React.createElement(Dashboard)
                }),
                
                // Visualizer Route
                React.createElement(Route, {
                    path: '/visualizer',
                    element: React.createElement(Visualizer)
                })
            )
        ),
        
        // Footer
        React.createElement(
            'footer',
            { className: 'app-footer' },
            React.createElement(
                'p',
                null,
                '© 2026 Task Scheduling Visualizer | DAA Project | Greedy Algorithm Implementation'
            )
        )
    );
}

module.exports = App;
