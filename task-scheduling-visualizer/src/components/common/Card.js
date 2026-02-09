/**
 * ============================================
 * CARD COMPONENT
 * ============================================
 * 
 * A reusable card component for the Dashboard.
 * Used to display information sections in a clean format.
 * 
 * Props:
 * - title: Card title
 * - icon: Emoji icon for the card
 * - children: Card content
 * - className: Additional CSS classes
 * ============================================
 */

const React = require('react');

/**
 * Card Component
 * 
 * A styled container for grouping related content.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card heading
 * @param {string} props.icon - Icon emoji
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 */
function Card(props) {
    const { title, icon, children, className = '' } = props;

    return React.createElement(
        'div',
        { className: `card ${className}`.trim() },
        
        // Card header
        title && React.createElement(
            'div',
            { className: 'card-header' },
            icon && React.createElement('span', { className: 'card-icon' }, icon),
            React.createElement('h3', { className: 'card-title' }, title)
        ),
        
        // Card body
        React.createElement(
            'div',
            { className: 'card-body' },
            children
        )
    );
}

/**
 * InfoItem Component
 * 
 * A sub-component for displaying labeled information.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Item label
 * @param {string} props.value - Item value
 */
function InfoItem(props) {
    const { label, value, highlight = false } = props;

    return React.createElement(
        'div',
        { className: `info-item ${highlight ? 'highlight' : ''}` },
        React.createElement('span', { className: 'info-label' }, label),
        React.createElement('span', { className: 'info-value' }, value)
    );
}

/**
 * ListItem Component
 * 
 * A styled list item with optional icon.
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - Item text
 * @param {string} props.icon - Optional icon
 */
function ListItem(props) {
    const { text, icon = '•' } = props;

    return React.createElement(
        'li',
        { className: 'list-item' },
        React.createElement('span', { className: 'list-icon' }, icon),
        React.createElement('span', { className: 'list-text' }, text)
    );
}

module.exports = { Card, InfoItem, ListItem };
