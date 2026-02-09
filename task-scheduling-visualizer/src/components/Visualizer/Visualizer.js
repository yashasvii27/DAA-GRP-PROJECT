/**
 * ============================================
 * VISUALIZER COMPONENT
 * ============================================
 * 
 * Interactive visualization page for Task Scheduling Algorithm.
 * 
 * Features:
 * - Dynamic task input (add/remove tasks)
 * - Step-by-step animation of scheduling process
 * - Timeline slot visualization
 * - Color-coded status indicators
 * - Real-time profit calculation
 * 
 * Uses:
 * - React.createElement (no JSX)
 * - useState, useEffect hooks
 * - setTimeout for animations
 * - Pure CSS animations
 * ============================================
 */

const React = require('react');
const { useState, useEffect, useCallback } = React;
const { greedyTaskScheduling, generateSampleTasks, validateTask } = require('../../algorithms/taskScheduling');

/**
 * Animation speed options (milliseconds)
 */
const ANIMATION_SPEEDS = {
    SLOW: 2000,
    MEDIUM: 1200,
    FAST: 600
};

/**
 * Visualizer Component
 * 
 * Main interactive visualization component for the
 * Task Scheduling Algorithm.
 */
function Visualizer() {
    // ============================================
    // STATE MANAGEMENT
    // ============================================

    // Tasks state - array of task objects
    const [tasks, setTasks] = useState([
        { id: 'T1', deadline: 2, profit: 100 },
        { id: 'T2', deadline: 1, profit: 50 },
        { id: 'T3', deadline: 2, profit: 20 },
        { id: 'T4', deadline: 1, profit: 40 },
        { id: 'T5', deadline: 3, profit: 70 }
    ]);

    // New task input state
    const [newTask, setNewTask] = useState({
        id: '',
        deadline: '',
        profit: ''
    });

    // Visualization state
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([]);
    const [currentSlots, setCurrentSlots] = useState([]);
    const [highlightedTask, setHighlightedTask] = useState(null);
    const [highlightedSlot, setHighlightedSlot] = useState(null);
    const [animationSpeed, setAnimationSpeed] = useState(ANIMATION_SPEEDS.MEDIUM);

    // Result state
    const [result, setResult] = useState(null);
    const [sortedTasks, setSortedTasks] = useState([]);

    // Error state
    const [error, setError] = useState('');

    // ============================================
    // INPUT HANDLERS
    // ============================================

    /**
     * Handle input change for new task fields
     */
    const handleInputChange = (field, value) => {
        setNewTask(prev => ({
            ...prev,
            [field]: value
        }));
        setError('');
    };

    /**
     * Add a new task to the list
     */
    const addTask = () => {
        // Validate input
        const taskToAdd = {
            id: newTask.id.trim(),
            deadline: parseInt(newTask.deadline, 10),
            profit: parseInt(newTask.profit, 10)
        };

        const validation = validateTask(taskToAdd);
        if (!validation.isValid) {
            setError(validation.errors.join(', '));
            return;
        }

        // Check for duplicate ID
        if (tasks.some(t => t.id === taskToAdd.id)) {
            setError('Task ID already exists');
            return;
        }

        setTasks(prev => [...prev, taskToAdd]);
        setNewTask({ id: '', deadline: '', profit: '' });
        resetVisualization();
    };

    /**
     * Remove a task from the list
     */
    const removeTask = (taskId) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
        resetVisualization();
    };

    /**
     * Load sample tasks
     */
    const loadSampleTasks = () => {
        setTasks(generateSampleTasks());
        resetVisualization();
    };

    /**
     * Clear all tasks
     */
    const clearTasks = () => {
        setTasks([]);
        resetVisualization();
    };

    // ============================================
    // VISUALIZATION LOGIC
    // ============================================

    /**
     * Reset visualization state
     */
    const resetVisualization = () => {
        setIsRunning(false);
        setCurrentStep(0);
        setSteps([]);
        setCurrentSlots([]);
        setHighlightedTask(null);
        setHighlightedSlot(null);
        setResult(null);
        setSortedTasks([]);
    };

    /**
     * Start the visualization
     */
    const startVisualization = () => {
        if (tasks.length === 0) {
            setError('Please add at least one task');
            return;
        }

        // Run the algorithm to get steps
        const algorithmResult = greedyTaskScheduling(tasks);
        setSteps(algorithmResult.steps);
        setResult(algorithmResult);
        setCurrentStep(0);
        setIsRunning(true);
        
        // Initialize slots for visualization
        const maxDeadline = Math.max(...tasks.map(t => t.deadline));
        setCurrentSlots(new Array(maxDeadline + 1).fill(null));
    };

    /**
     * Animation effect - process steps sequentially
     */
    useEffect(() => {
        if (!isRunning || steps.length === 0) return;

        if (currentStep >= steps.length) {
            setIsRunning(false);
            setHighlightedTask(null);
            setHighlightedSlot(null);
            return;
        }

        const step = steps[currentStep];

        // Process the current step
        const processStep = () => {
            switch (step.type) {
                case 'SORT':
                    setSortedTasks(step.tasks);
                    break;
                case 'INIT_SLOTS':
                    setCurrentSlots(step.slots);
                    break;
                case 'CONSIDER_TASK':
                    setHighlightedTask(step.currentTask);
                    setHighlightedSlot(null);
                    break;
                case 'ASSIGN':
                    setHighlightedSlot(step.assignedSlot);
                    setCurrentSlots(step.slots);
                    break;
                case 'REJECT':
                    setHighlightedTask(step.currentTask);
                    break;
                case 'COMPLETE':
                    setHighlightedTask(null);
                    setHighlightedSlot(null);
                    break;
            }
        };

        processStep();

        // Move to next step after delay
        const timer = setTimeout(() => {
            setCurrentStep(prev => prev + 1);
        }, animationSpeed);

        return () => clearTimeout(timer);
    }, [isRunning, currentStep, steps, animationSpeed]);

    /**
     * Pause/Resume visualization
     */
    const togglePause = () => {
        setIsRunning(prev => !prev);
    };

    /**
     * Step forward manually
     */
    const stepForward = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    /**
     * Step backward manually
     */
    const stepBackward = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // ============================================
    // RENDER HELPERS
    // ============================================

    /**
     * Get current step info for display
     */
    const getCurrentStepInfo = () => {
        if (steps.length === 0 || currentStep >= steps.length) {
            return null;
        }
        return steps[currentStep];
    };

    /**
     * Get task status class based on current step
     */
    const getTaskStatusClass = (task) => {
        if (!result) return '';
        
        const isScheduled = result.scheduledTasks.some(t => t.id === task.id);
        const isRejected = result.rejectedTasks.some(t => t.id === task.id);
        const isHighlighted = highlightedTask && highlightedTask.id === task.id;
        
        let classes = [];
        if (isHighlighted) classes.push('highlighted');
        if (currentStep >= steps.length - 1) {
            if (isScheduled) classes.push('scheduled');
            if (isRejected) classes.push('rejected');
        }
        
        return classes.join(' ');
    };

    /**
     * Get slot status class
     */
    const getSlotStatusClass = (slotIndex) => {
        const isHighlighted = highlightedSlot === slotIndex;
        const isOccupied = currentSlots[slotIndex] !== null;
        
        let classes = ['slot'];
        if (isHighlighted) classes.push('highlighted');
        if (isOccupied) classes.push('occupied');
        
        return classes.join(' ');
    };

    // ============================================
    // RENDER COMPONENT
    // ============================================

    const stepInfo = getCurrentStepInfo();

    return React.createElement(
        'div',
        { className: 'visualizer' },

        // Page Title
        React.createElement(
            'div',
            { className: 'visualizer-header' },
            React.createElement('h1', null, '🎯 Task Scheduling Visualizer'),
            React.createElement('p', null, 'Interactive visualization of the Greedy Task Scheduling Algorithm')
        ),

        // Main Content Grid
        React.createElement(
            'div',
            { className: 'visualizer-content' },

            // Left Panel - Input Section
            React.createElement(
                'div',
                { className: 'input-panel' },
                
                // Add Task Form
                React.createElement(
                    'div',
                    { className: 'input-section' },
                    React.createElement('h3', null, '📝 Add New Task'),
                    
                    React.createElement(
                        'div',
                        { className: 'input-form' },
                        
                        // Task ID Input
                        React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement('label', null, 'Task ID'),
                            React.createElement('input', {
                                type: 'text',
                                value: newTask.id,
                                onChange: (e) => handleInputChange('id', e.target.value),
                                placeholder: 'e.g., T6',
                                disabled: isRunning
                            })
                        ),
                        
                        // Deadline Input
                        React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement('label', null, 'Deadline'),
                            React.createElement('input', {
                                type: 'number',
                                value: newTask.deadline,
                                onChange: (e) => handleInputChange('deadline', e.target.value),
                                placeholder: 'e.g., 3',
                                min: 1,
                                disabled: isRunning
                            })
                        ),
                        
                        // Profit Input
                        React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement('label', null, 'Profit'),
                            React.createElement('input', {
                                type: 'number',
                                value: newTask.profit,
                                onChange: (e) => handleInputChange('profit', e.target.value),
                                placeholder: 'e.g., 50',
                                min: 0,
                                disabled: isRunning
                            })
                        ),
                        
                        // Add Button
                        React.createElement(
                            'button',
                            { 
                                className: 'btn btn-add',
                                onClick: addTask,
                                disabled: isRunning
                            },
                            '+ Add Task'
                        )
                    ),
                    
                    // Error message
                    error && React.createElement(
                        'div',
                        { className: 'error-message' },
                        error
                    ),
                    
                    // Quick actions
                    React.createElement(
                        'div',
                        { className: 'quick-actions' },
                        React.createElement(
                            'button',
                            { 
                                className: 'btn btn-secondary',
                                onClick: loadSampleTasks,
                                disabled: isRunning
                            },
                            '📋 Load Sample'
                        ),
                        React.createElement(
                            'button',
                            { 
                                className: 'btn btn-danger',
                                onClick: clearTasks,
                                disabled: isRunning
                            },
                            '🗑️ Clear All'
                        )
                    )
                ),
                
                // Task List
                React.createElement(
                    'div',
                    { className: 'task-list-section' },
                    React.createElement('h3', null, '📋 Task List (', tasks.length, ')'),
                    
                    React.createElement(
                        'div',
                        { className: 'task-list' },
                        tasks.length === 0 
                            ? React.createElement('p', { className: 'empty-message' }, 'No tasks added yet')
                            : tasks.map(task => 
                                React.createElement(
                                    'div',
                                    { 
                                        key: task.id,
                                        className: `task-item ${getTaskStatusClass(task)}`
                                    },
                                    React.createElement(
                                        'div',
                                        { className: 'task-info' },
                                        React.createElement('span', { className: 'task-id' }, task.id),
                                        React.createElement('span', { className: 'task-deadline' }, 'D:', task.deadline),
                                        React.createElement('span', { className: 'task-profit' }, 'P:', task.profit)
                                    ),
                                    !isRunning && React.createElement(
                                        'button',
                                        { 
                                            className: 'btn-remove',
                                            onClick: () => removeTask(task.id)
                                        },
                                        '×'
                                    )
                                )
                            )
                    )
                ),

                // Speed Control
                React.createElement(
                    'div',
                    { className: 'speed-control' },
                    React.createElement('h4', null, '⚡ Animation Speed'),
                    React.createElement(
                        'div',
                        { className: 'speed-buttons' },
                        React.createElement(
                            'button',
                            { 
                                className: `btn-speed ${animationSpeed === ANIMATION_SPEEDS.SLOW ? 'active' : ''}`,
                                onClick: () => setAnimationSpeed(ANIMATION_SPEEDS.SLOW)
                            },
                            'Slow'
                        ),
                        React.createElement(
                            'button',
                            { 
                                className: `btn-speed ${animationSpeed === ANIMATION_SPEEDS.MEDIUM ? 'active' : ''}`,
                                onClick: () => setAnimationSpeed(ANIMATION_SPEEDS.MEDIUM)
                            },
                            'Medium'
                        ),
                        React.createElement(
                            'button',
                            { 
                                className: `btn-speed ${animationSpeed === ANIMATION_SPEEDS.FAST ? 'active' : ''}`,
                                onClick: () => setAnimationSpeed(ANIMATION_SPEEDS.FAST)
                            },
                            'Fast'
                        )
                    )
                )
            ),

            // Right Panel - Visualization
            React.createElement(
                'div',
                { className: 'visualization-panel' },
                
                // Control Bar
                React.createElement(
                    'div',
                    { className: 'control-bar' },
                    React.createElement(
                        'button',
                        { 
                            className: 'btn btn-primary btn-start',
                            onClick: steps.length > 0 ? (isRunning ? togglePause : () => setIsRunning(true)) : startVisualization,
                            disabled: tasks.length === 0
                        },
                        steps.length === 0 ? '▶️ Start Visualization' : (isRunning ? '⏸️ Pause' : '▶️ Resume')
                    ),
                    steps.length > 0 && React.createElement(
                        'button',
                        { 
                            className: 'btn btn-secondary',
                            onClick: resetVisualization
                        },
                        '🔄 Reset'
                    ),
                    steps.length > 0 && !isRunning && React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(
                            'button',
                            { 
                                className: 'btn btn-secondary',
                                onClick: stepBackward,
                                disabled: currentStep === 0
                            },
                            '⬅️ Back'
                        ),
                        React.createElement(
                            'button',
                            { 
                                className: 'btn btn-secondary',
                                onClick: stepForward,
                                disabled: currentStep >= steps.length - 1
                            },
                            '➡️ Next'
                        )
                    )
                ),

                // Step Progress
                steps.length > 0 && React.createElement(
                    'div',
                    { className: 'step-progress' },
                    React.createElement('span', null, `Step ${currentStep + 1} of ${steps.length}`),
                    React.createElement(
                        'div',
                        { className: 'progress-bar' },
                        React.createElement('div', { 
                            className: 'progress-fill',
                            style: { width: `${((currentStep + 1) / steps.length) * 100}%` }
                        })
                    )
                ),

                // Step Info Display
                stepInfo && React.createElement(
                    'div',
                    { className: `step-info step-${stepInfo.type.toLowerCase()}` },
                    React.createElement('div', { className: 'step-message' }, stepInfo.message),
                    React.createElement('div', { className: 'step-description' }, stepInfo.description)
                ),

                // Sorted Tasks Display
                sortedTasks.length > 0 && React.createElement(
                    'div',
                    { className: 'sorted-tasks' },
                    React.createElement('h4', null, '📊 Sorted by Profit (Descending)'),
                    React.createElement(
                        'div',
                        { className: 'sorted-tasks-list' },
                        sortedTasks.map((task, index) => 
                            React.createElement(
                                'div',
                                { 
                                    key: task.id,
                                    className: `sorted-task ${highlightedTask && highlightedTask.id === task.id ? 'active' : ''}`
                                },
                                React.createElement('span', { className: 'rank' }, index + 1),
                                React.createElement('span', { className: 'task-id' }, task.id),
                                React.createElement('span', { className: 'profit-badge' }, '₹', task.profit)
                            )
                        )
                    )
                ),

                // Timeline Slots Visualization
                currentSlots.length > 1 && React.createElement(
                    'div',
                    { className: 'timeline-section' },
                    React.createElement('h4', null, '⏱️ Timeline Slots'),
                    React.createElement(
                        'div',
                        { className: 'timeline' },
                        currentSlots.slice(1).map((slot, index) => {
                            const slotIndex = index + 1;
                            return React.createElement(
                                'div',
                                { 
                                    key: slotIndex,
                                    className: getSlotStatusClass(slotIndex)
                                },
                                React.createElement('div', { className: 'slot-label' }, `Slot ${slotIndex}`),
                                React.createElement(
                                    'div',
                                    { className: 'slot-content' },
                                    slot 
                                        ? React.createElement(
                                            'div',
                                            { className: 'slot-task' },
                                            React.createElement('span', { className: 'slot-task-id' }, slot.id),
                                            React.createElement('span', { className: 'slot-task-profit' }, '₹', slot.profit)
                                          )
                                        : React.createElement('span', { className: 'empty-slot' }, 'Empty')
                                )
                            );
                        })
                    ),
                    
                    // Legend
                    React.createElement(
                        'div',
                        { className: 'legend' },
                        React.createElement('span', { className: 'legend-item' },
                            React.createElement('span', { className: 'legend-color empty' }),
                            'Empty'
                        ),
                        React.createElement('span', { className: 'legend-item' },
                            React.createElement('span', { className: 'legend-color occupied' }),
                            'Assigned'
                        ),
                        React.createElement('span', { className: 'legend-item' },
                            React.createElement('span', { className: 'legend-color highlighted' }),
                            'Processing'
                        )
                    )
                ),

                // Results Section
                result && currentStep >= steps.length - 1 && React.createElement(
                    'div',
                    { className: 'results-section' },
                    React.createElement('h3', null, '📊 Final Results'),
                    
                    React.createElement(
                        'div',
                        { className: 'results-grid' },
                        
                        // Total Profit
                        React.createElement(
                            'div',
                            { className: 'result-card profit' },
                            React.createElement('span', { className: 'result-icon' }, '💰'),
                            React.createElement('span', { className: 'result-value' }, '₹', result.totalProfit),
                            React.createElement('span', { className: 'result-label' }, 'Total Profit')
                        ),
                        
                        // Tasks Completed
                        React.createElement(
                            'div',
                            { className: 'result-card completed' },
                            React.createElement('span', { className: 'result-icon' }, '✅'),
                            React.createElement('span', { className: 'result-value' }, result.scheduledTasks.length),
                            React.createElement('span', { className: 'result-label' }, 'Tasks Scheduled')
                        ),
                        
                        // Tasks Rejected
                        React.createElement(
                            'div',
                            { className: 'result-card rejected' },
                            React.createElement('span', { className: 'result-icon' }, '❌'),
                            React.createElement('span', { className: 'result-value' }, result.rejectedTasks.length),
                            React.createElement('span', { className: 'result-label' }, 'Tasks Rejected')
                        )
                    ),
                    
                    // Scheduled Tasks Detail
                    React.createElement(
                        'div',
                        { className: 'scheduled-tasks-detail' },
                        React.createElement('h4', null, '✅ Scheduled Tasks'),
                        React.createElement(
                            'div',
                            { className: 'detail-list' },
                            result.scheduledTasks.map(task =>
                                React.createElement(
                                    'div',
                                    { key: task.id, className: 'detail-item success' },
                                    React.createElement('span', null, task.id),
                                    React.createElement('span', null, 'Slot: ', task.assignedSlot),
                                    React.createElement('span', null, 'Profit: ₹', task.profit)
                                )
                            )
                        )
                    ),
                    
                    // Rejected Tasks Detail
                    result.rejectedTasks.length > 0 && React.createElement(
                        'div',
                        { className: 'rejected-tasks-detail' },
                        React.createElement('h4', null, '❌ Rejected Tasks'),
                        React.createElement(
                            'div',
                            { className: 'detail-list' },
                            result.rejectedTasks.map(task =>
                                React.createElement(
                                    'div',
                                    { key: task.id, className: 'detail-item danger' },
                                    React.createElement('span', null, task.id),
                                    React.createElement('span', null, 'Deadline: ', task.deadline),
                                    React.createElement('span', null, 'Profit: ₹', task.profit)
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}

module.exports = Visualizer;
