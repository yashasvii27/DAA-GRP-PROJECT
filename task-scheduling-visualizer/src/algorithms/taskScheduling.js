/**
 * ============================================
 * GREEDY TASK SCHEDULING ALGORITHM
 * ============================================
 * 
 * This file implements the Greedy Task Scheduling Algorithm
 * used for scheduling jobs with deadlines to maximize profit.
 * 
 * ============================================
 * ALGORITHM EXPLANATION (For Viva)
 * ============================================
 * 
 * PROBLEM STATEMENT:
 * Given n tasks where each task has:
 *   - Task ID
 *   - Deadline (must complete by this time slot)
 *   - Profit (earned if task is completed)
 * 
 * Find the maximum profit sequence of tasks such that:
 *   - Each task takes exactly 1 unit of time
 *   - Only one task can be scheduled at a time
 *   - A task must be completed by its deadline
 * 
 * ============================================
 * WHY GREEDY WORKS
 * ============================================
 * 
 * GREEDY CHOICE PROPERTY:
 * - By always selecting the highest profit task first,
 *   we ensure we never miss the opportunity to include
 *   the most valuable tasks.
 * 
 * OPTIMAL SUBSTRUCTURE:
 * - After scheduling the highest profit task, the remaining
 *   subproblem (scheduling remaining tasks) is identical
 *   in structure to the original problem.
 * 
 * PROOF INTUITION:
 * - Suppose greedy doesn't give optimal solution
 * - Then there exists a task X with lower profit scheduled
 *   instead of task Y with higher profit
 * - We can always swap X with Y (if slot available) or
 *   replace X with Y to get better/equal profit
 * - This contradicts our assumption, hence greedy is optimal
 * 
 * ============================================
 * TIME COMPLEXITY ANALYSIS
 * ============================================
 * 
 * 1. Sorting tasks by profit: O(n log n)
 * 2. For each task, finding available slot: O(n)
 *    - In worst case, we check all slots
 * 3. Total: O(n log n) + O(n²) = O(n²)
 * 
 * With Union-Find optimization: O(n log n)
 * 
 * ============================================
 * SPACE COMPLEXITY ANALYSIS
 * ============================================
 * 
 * 1. Slot array: O(max_deadline) ≈ O(n)
 * 2. Result array: O(n)
 * 3. Auxiliary space for sorting: O(log n)
 * 
 * Total Space Complexity: O(n)
 * 
 * ============================================
 */

/**
 * Main function to solve the Task Scheduling Problem
 * 
 * @param {Array} tasks - Array of task objects with id, deadline, profit
 * @returns {Object} - Contains scheduled tasks, total profit, and steps for visualization
 * 
 * ALGORITHM STEPS:
 * 1. Sort all tasks in descending order of profit
 * 2. Initialize time slots (all empty)
 * 3. For each task (in sorted order):
 *    a. Find latest available slot before deadline
 *    b. If slot found, schedule task
 *    c. If no slot available, reject task
 * 4. Return scheduled tasks and total profit
 */
function greedyTaskScheduling(tasks) {
    // Edge case: empty input
    if (!tasks || tasks.length === 0) {
        return {
            scheduledTasks: [],
            rejectedTasks: [],
            totalProfit: 0,
            slots: [],
            steps: []
        };
    }

    // Array to store visualization steps
    const steps = [];

    // Step 1: Create a copy to avoid mutating original array
    const tasksCopy = tasks.map(task => ({ ...task }));

    // Step 2: Sort tasks by profit in descending order (GREEDY CHOICE)
    // This ensures we always consider the most profitable task first
    tasksCopy.sort((a, b) => b.profit - a.profit);

    steps.push({
        type: 'SORT',
        message: 'Sorting tasks by profit in descending order (Greedy Choice)',
        tasks: [...tasksCopy],
        description: 'Greedy approach: Always consider the most profitable task first'
    });

    // Step 3: Find the maximum deadline to determine number of slots
    const maxDeadline = Math.max(...tasksCopy.map(task => task.deadline));

    // Step 4: Initialize slots array
    // slots[i] = task scheduled at time slot i, or null if empty
    // Index 0 is unused (time slots are 1-indexed)
    const slots = new Array(maxDeadline + 1).fill(null);

    steps.push({
        type: 'INIT_SLOTS',
        message: `Created ${maxDeadline} time slots`,
        slots: [...slots],
        description: `Maximum deadline is ${maxDeadline}, so we need ${maxDeadline} time slots`
    });

    // Arrays to track scheduled and rejected tasks
    const scheduledTasks = [];
    const rejectedTasks = [];
    let totalProfit = 0;

    // Step 5: Process each task in sorted order
    for (let i = 0; i < tasksCopy.length; i++) {
        const task = tasksCopy[i];
        let scheduled = false;

        steps.push({
            type: 'CONSIDER_TASK',
            message: `Considering Task ${task.id} (Profit: ${task.profit}, Deadline: ${task.deadline})`,
            currentTask: task,
            slots: [...slots],
            description: `Looking for latest available slot before deadline ${task.deadline}`
        });

        /**
         * CRITICAL GREEDY LOGIC:
         * Find the latest available slot BEFORE the deadline
         * 
         * Why latest slot?
         * - Keeps earlier slots free for tasks with tighter deadlines
         * - Maximizes flexibility for future tasks
         * - Ensures optimal utilization
         */
        for (let j = Math.min(maxDeadline, task.deadline); j >= 1; j--) {
            if (slots[j] === null) {
                // Found an available slot!
                slots[j] = task;
                scheduledTasks.push({ ...task, assignedSlot: j });
                totalProfit += task.profit;
                scheduled = true;

                steps.push({
                    type: 'ASSIGN',
                    message: `✓ Task ${task.id} assigned to Slot ${j}`,
                    currentTask: task,
                    assignedSlot: j,
                    slots: [...slots],
                    totalProfit: totalProfit,
                    description: `Slot ${j} was available, task scheduled successfully!`
                });

                break;
            }
        }

        // If no slot found, reject the task
        if (!scheduled) {
            rejectedTasks.push(task);

            steps.push({
                type: 'REJECT',
                message: `✗ Task ${task.id} rejected - No available slot`,
                currentTask: task,
                slots: [...slots],
                description: `All slots before deadline ${task.deadline} are occupied`
            });
        }
    }

    // Final summary step
    steps.push({
        type: 'COMPLETE',
        message: 'Scheduling Complete!',
        scheduledTasks: [...scheduledTasks],
        rejectedTasks: [...rejectedTasks],
        totalProfit: totalProfit,
        slots: [...slots],
        description: `Scheduled ${scheduledTasks.length} tasks with total profit of ${totalProfit}`
    });

    return {
        scheduledTasks,
        rejectedTasks,
        totalProfit,
        slots,
        steps
    };
}

/**
 * Helper function to validate task input
 * 
 * @param {Object} task - Task object to validate
 * @returns {Object} - { isValid: boolean, errors: array }
 */
function validateTask(task) {
    const errors = [];

    if (!task.id || task.id.trim() === '') {
        errors.push('Task ID is required');
    }

    if (!Number.isInteger(task.deadline) || task.deadline < 1) {
        errors.push('Deadline must be a positive integer');
    }

    if (!Number.isInteger(task.profit) || task.profit < 0) {
        errors.push('Profit must be a non-negative integer');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Generate sample tasks for demonstration
 * 
 * @returns {Array} - Array of sample task objects
 */
function generateSampleTasks() {
    return [
        { id: 'T1', deadline: 2, profit: 100 },
        { id: 'T2', deadline: 1, profit: 50 },
        { id: 'T3', deadline: 2, profit: 20 },
        { id: 'T4', deadline: 1, profit: 40 },
        { id: 'T5', deadline: 3, profit: 70 }
    ];
}

/**
 * ============================================
 * ADDITIONAL ALGORITHM NOTES (For Viva)
 * ============================================
 * 
 * VARIATIONS OF TASK SCHEDULING:
 * 
 * 1. WEIGHTED JOB SCHEDULING (Dynamic Programming)
 *    - Jobs have variable durations
 *    - Uses DP with binary search
 *    - Time: O(n log n)
 * 
 * 2. INTERVAL SCHEDULING MAXIMIZATION
 *    - Maximize number of non-overlapping intervals
 *    - Sort by finish time
 *    - Time: O(n log n)
 * 
 * 3. FCFS (First Come First Serve)
 *    - Process tasks in arrival order
 *    - Simple but not optimal
 * 
 * 4. PRIORITY SCHEDULING
 *    - Tasks have priorities
 *    - Higher priority executed first
 * 
 * WHY THIS ALGORITHM IS IMPORTANT IN DAA:
 * - Classic example of Greedy paradigm
 * - Real-world applications in OS, cloud computing
 * - Demonstrates optimal substructure
 * - Teaches proof techniques for greedy algorithms
 * ============================================
 */

// Export functions for use in components
module.exports = {
    greedyTaskScheduling,
    validateTask,
    generateSampleTasks
};
