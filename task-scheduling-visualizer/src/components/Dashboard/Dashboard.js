/**
 * ============================================
 * DASHBOARD COMPONENT
 * ============================================
 * 
 * Main dashboard page explaining the Task Scheduling Algorithm.
 * 
 * Sections:
 * 1. Algorithm Overview
 * 2. Algorithms Covered
 * 3. Advantages
 * 4. Real-World Use Cases
 * 5. Complexity Analysis
 * 6. Navigation to Visualizer
 * 
 * Uses React.createElement (no JSX)
 * ============================================
 */

const React = require('react');
const { useNavigate } = require('react-router-dom');
const { Card, ListItem } = require('../common/Card');

/**
 * Dashboard Component
 * 
 * Educational page explaining Task Scheduling concepts
 * and the Greedy Algorithm approach.
 */
function Dashboard() {
    const navigate = useNavigate();

    /**
     * Navigate to Visualizer page
     */
    const goToVisualizer = () => {
        navigate('/visualizer');
    };

    return React.createElement(
        'div',
        { className: 'dashboard' },
        
        // Hero Section
        React.createElement(
            'section',
            { className: 'hero-section' },
            React.createElement(
                'div',
                { className: 'hero-content' },
                React.createElement('h1', { className: 'hero-title' }, 
                    '⏱️ Task Scheduling Algorithm'
                ),
                React.createElement('p', { className: 'hero-subtitle' },
                    'A Greedy Algorithm Approach to Maximize Profit with Deadline Constraints'
                ),
                React.createElement('div', { className: 'hero-tags' },
                    React.createElement('span', { className: 'tag' }, 'DAA'),
                    React.createElement('span', { className: 'tag' }, 'Greedy Algorithm'),
                    React.createElement('span', { className: 'tag' }, 'Optimization')
                )
            )
        ),

        // Cards Grid
        React.createElement(
            'div',
            { className: 'dashboard-grid' },
            
            // Card 1: Algorithm Overview
            React.createElement(
                Card,
                { title: 'Algorithm Overview', icon: '📖', className: 'card-overview' },
                React.createElement(
                    'div',
                    { className: 'overview-content' },
                    React.createElement('h4', null, 'What is Task Scheduling?'),
                    React.createElement('p', null,
                        'Task Scheduling is a classic optimization problem where we need to schedule a set of tasks, each with a deadline and profit, to maximize the total profit earned. Each task takes exactly one unit of time, and only one task can be scheduled at a time.'
                    ),
                    React.createElement('h4', null, 'Why is it important in DAA?'),
                    React.createElement('p', null,
                        'Task Scheduling is a fundamental problem in Design and Analysis of Algorithms (DAA) because:'
                    ),
                    React.createElement(
                        'ul',
                        { className: 'feature-list' },
                        React.createElement(ListItem, { 
                            text: 'Demonstrates the Greedy paradigm effectively',
                            icon: '✓'
                        }),
                        React.createElement(ListItem, { 
                            text: 'Has real-world applications in operating systems',
                            icon: '✓'
                        }),
                        React.createElement(ListItem, { 
                            text: 'Teaches optimal substructure property',
                            icon: '✓'
                        }),
                        React.createElement(ListItem, { 
                            text: 'Introduces proof techniques for correctness',
                            icon: '✓'
                        })
                    )
                )
            ),

            // Card 2: Algorithms Covered
            React.createElement(
                Card,
                { title: 'Algorithms Covered', icon: '⚙️', className: 'card-algorithms' },
                React.createElement(
                    'div',
                    { className: 'algorithm-list' },
                    
                    // Greedy Task Scheduling
                    React.createElement(
                        'div',
                        { className: 'algorithm-item primary' },
                        React.createElement('h4', null, '🎯 Greedy Task Scheduling'),
                        React.createElement('p', null, 'Main algorithm implemented with visualization'),
                        React.createElement('div', { className: 'algorithm-steps' },
                            React.createElement('span', { className: 'step' }, '1. Sort by profit (descending)'),
                            React.createElement('span', { className: 'step' }, '2. Assign to latest available slot'),
                            React.createElement('span', { className: 'step' }, '3. Reject if no slot available')
                        )
                    ),

                    // FCFS
                    React.createElement(
                        'div',
                        { className: 'algorithm-item secondary' },
                        React.createElement('h4', null, '📋 FCFS (First Come First Serve)'),
                        React.createElement('p', null, 
                            'A simple scheduling approach where tasks are processed in their arrival order. Easy to implement but does not optimize for profit or deadlines.'
                        )
                    ),

                    // Priority Scheduling
                    React.createElement(
                        'div',
                        { className: 'algorithm-item secondary' },
                        React.createElement('h4', null, '⭐ Priority Scheduling'),
                        React.createElement('p', null,
                            'Tasks are assigned priorities, and higher priority tasks are executed first. Can lead to starvation of low-priority tasks.'
                        )
                    )
                )
            ),

            // Card 3: Advantages
            React.createElement(
                Card,
                { title: 'Advantages', icon: '✨', className: 'card-advantages' },
                React.createElement(
                    'div',
                    { className: 'advantages-grid' },
                    
                    React.createElement('div', { className: 'advantage-item' },
                        React.createElement('span', { className: 'advantage-icon' }, '⚡'),
                        React.createElement('h5', null, 'Efficient CPU Utilization'),
                        React.createElement('p', null, 'Minimizes idle time by optimally filling all available time slots')
                    ),
                    
                    React.createElement('div', { className: 'advantage-item' },
                        React.createElement('span', { className: 'advantage-icon' }, '📈'),
                        React.createElement('h5', null, 'Maximizes Profit'),
                        React.createElement('p', null, 'Greedy choice ensures highest value tasks are prioritized')
                    ),
                    
                    React.createElement('div', { className: 'advantage-item' },
                        React.createElement('span', { className: 'advantage-icon' }, '🎯'),
                        React.createElement('h5', null, 'Minimizes Task Loss'),
                        React.createElement('p', null, 'Strategic slot allocation reduces task rejections')
                    ),
                    
                    React.createElement('div', { className: 'advantage-item' },
                        React.createElement('span', { className: 'advantage-icon' }, '🚀'),
                        React.createElement('h5', null, 'Fast Execution'),
                        React.createElement('p', null, 'O(n²) time complexity is practical for most use cases')
                    )
                )
            ),

            // Card 4: Real-World Use Cases
            React.createElement(
                Card,
                { title: 'Real-World Use Cases', icon: '🌍', className: 'card-usecases' },
                React.createElement(
                    'div',
                    { className: 'usecase-list' },
                    
                    React.createElement('div', { className: 'usecase-item' },
                        React.createElement('span', { className: 'usecase-icon' }, '💻'),
                        React.createElement('div', { className: 'usecase-content' },
                            React.createElement('h5', null, 'Operating Systems'),
                            React.createElement('p', null, 'CPU scheduling in OS kernels for process management and multitasking')
                        )
                    ),
                    
                    React.createElement('div', { className: 'usecase-item' },
                        React.createElement('span', { className: 'usecase-icon' }, '☁️'),
                        React.createElement('div', { className: 'usecase-content' },
                            React.createElement('h5', null, 'Cloud Computing'),
                            React.createElement('p', null, 'Job allocation in cloud platforms like AWS, Azure for resource optimization')
                        )
                    ),
                    
                    React.createElement('div', { className: 'usecase-item' },
                        React.createElement('span', { className: 'usecase-icon' }, '📊'),
                        React.createElement('div', { className: 'usecase-content' },
                            React.createElement('h5', null, 'Project Management'),
                            React.createElement('p', null, 'Task planning tools like Jira, Trello for deadline management')
                        )
                    ),
                    
                    React.createElement('div', { className: 'usecase-item' },
                        React.createElement('span', { className: 'usecase-icon' }, '🏭'),
                        React.createElement('div', { className: 'usecase-content' },
                            React.createElement('h5', null, 'Manufacturing'),
                            React.createElement('p', null, 'Production line scheduling to meet delivery deadlines efficiently')
                        )
                    ),
                    
                    React.createElement('div', { className: 'usecase-item' },
                        React.createElement('span', { className: 'usecase-icon' }, '🔧'),
                        React.createElement('div', { className: 'usecase-content' },
                            React.createElement('h5', null, 'Compiler Design'),
                            React.createElement('p', null, 'Instruction scheduling for optimal code execution in compilers')
                        )
                    )
                )
            ),

            // Card 5: Complexity Analysis
            React.createElement(
                Card,
                { title: 'Complexity Analysis', icon: '📐', className: 'card-complexity' },
                React.createElement(
                    'div',
                    { className: 'complexity-content' },
                    
                    // Time Complexity Section
                    React.createElement('div', { className: 'complexity-section' },
                        React.createElement('h4', null, '⏰ Time Complexity'),
                        React.createElement('div', { className: 'complexity-box time' },
                            React.createElement('span', { className: 'big-o' }, 'O(n²)'),
                            React.createElement('span', { className: 'optimized' }, 'O(n log n) with Union-Find')
                        ),
                        React.createElement('div', { className: 'complexity-breakdown' },
                            React.createElement('div', { className: 'breakdown-item' },
                                React.createElement('code', null, 'O(n log n)'),
                                React.createElement('span', null, ' - Sorting tasks by profit')
                            ),
                            React.createElement('div', { className: 'breakdown-item' },
                                React.createElement('code', null, 'O(n)'),
                                React.createElement('span', null, ' - Finding slot for each task')
                            ),
                            React.createElement('div', { className: 'breakdown-item' },
                                React.createElement('code', null, 'O(n²)'),
                                React.createElement('span', null, ' - Total (worst case)')
                            )
                        )
                    ),
                    
                    // Space Complexity Section
                    React.createElement('div', { className: 'complexity-section' },
                        React.createElement('h4', null, '💾 Space Complexity'),
                        React.createElement('div', { className: 'complexity-box space' },
                            React.createElement('span', { className: 'big-o' }, 'O(n)')
                        ),
                        React.createElement('div', { className: 'complexity-breakdown' },
                            React.createElement('div', { className: 'breakdown-item' },
                                React.createElement('code', null, 'O(n)'),
                                React.createElement('span', null, ' - Slot array storage')
                            ),
                            React.createElement('div', { className: 'breakdown-item' },
                                React.createElement('code', null, 'O(n)'),
                                React.createElement('span', null, ' - Result arrays')
                            ),
                            React.createElement('div', { className: 'breakdown-item' },
                                React.createElement('code', null, 'O(log n)'),
                                React.createElement('span', null, ' - Sorting auxiliary space')
                            )
                        )
                    )
                )
            ),

            // Card 6: Pseudocode
            React.createElement(
                Card,
                { title: 'Algorithm Pseudocode', icon: '📝', className: 'card-pseudocode' },
                React.createElement(
                    'pre',
                    { className: 'pseudocode' },
                    `GREEDY-TASK-SCHEDULING(tasks):
    // Step 1: Sort tasks by profit (descending)
    SORT tasks by profit DESC
    
    // Step 2: Find max deadline
    maxDeadline ← MAX(task.deadline for all tasks)
    
    // Step 3: Initialize slots
    slots[1...maxDeadline] ← NULL
    
    // Step 4: Schedule each task
    FOR each task in sorted order:
        // Find latest available slot
        FOR j ← MIN(maxDeadline, task.deadline) DOWN TO 1:
            IF slots[j] == NULL:
                slots[j] ← task
                totalProfit += task.profit
                BREAK
        
        IF task not scheduled:
            REJECT task
    
    RETURN scheduled tasks, totalProfit`
                )
            )
        ),

        // CTA Section
        React.createElement(
            'section',
            { className: 'cta-section' },
            React.createElement('h2', null, 'Ready to See it in Action?'),
            React.createElement('p', null, 
                'Experience the Task Scheduling Algorithm with interactive visualizations. Add tasks, watch the greedy selection process, and understand how optimal scheduling works!'
            ),
            React.createElement(
                'button',
                { 
                    className: 'cta-button',
                    onClick: goToVisualizer
                },
                React.createElement('span', null, '🚀'),
                ' Launch Visualizer'
            )
        )
    );
}

module.exports = Dashboard;
