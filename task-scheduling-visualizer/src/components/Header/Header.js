/**
 * ============================================
 * HEADER COMPONENT
 * ============================================
 * 
 * Navigation header component for the application.
 * Provides links to Dashboard and Visualizer pages.
 * 
 * Uses React.createElement (no JSX)
 * Uses React Router's Link component for navigation
 * ============================================
 */

const React = require('react');
const { Link, useLocation } = require('react-router-dom');

/**
 * Header Component
 * 
 * Displays:
 * - Application logo/title
 * - Navigation links
 * - Active page indicator
 */
function Header() {
    // Get current location to highlight active link
    const location = useLocation();

    /**
     * Helper to check if a path is active
     * @param {string} path - Path to check
     * @returns {boolean} - True if path matches current location
     */
    const isActive = (path) => {
        return location.pathname === path;
    };

    return React.createElement(
        'header',
        { className: 'header' },
        
        // Header container
        React.createElement(
            'div',
            { className: 'header-container' },
            
            // Logo section
            React.createElement(
                'div',
                { className: 'header-logo' },
                React.createElement(
                    Link,
                    { to: '/', className: 'logo-link' },
                    React.createElement(
                        'span',
                        { className: 'logo-icon' },
                        '⏱️'
                    ),
                    React.createElement(
                        'span',
                        { className: 'logo-text' },
                        'Task Scheduler'
                    )
                )
            ),
            
            // Navigation
            React.createElement(
                'nav',
                { className: 'header-nav' },
                
                // Dashboard link
                React.createElement(
                    Link,
                    {
                        to: '/',
                        className: `nav-link ${isActive('/') ? 'active' : ''}`
                    },
                    React.createElement('span', { className: 'nav-icon' }, '📊'),
                    ' Dashboard'
                ),
                
                // Visualizer link
                React.createElement(
                    Link,
                    {
                        to: '/visualizer',
                        className: `nav-link ${isActive('/visualizer') ? 'active' : ''}`
                    },
                    React.createElement('span', { className: 'nav-icon' }, '🎯'),
                    ' Visualizer'
                )
            ),
            
            // Right section - DAA badge
            React.createElement(
                'div',
                { className: 'header-badge' },
                React.createElement(
                    'span',
                    { className: 'badge' },
                    'DAA Project'
                )
            )
        )
    );
}

module.exports = Header;
