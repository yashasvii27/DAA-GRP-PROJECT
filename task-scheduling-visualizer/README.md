# Task Scheduling Visualizer (DAA Project)

A college-ready Visualizer demonstrating the Greedy Task Scheduling Algorithm.

## Features
- Dashboard explaining the algorithm, complexity and use-cases
- Interactive Visualizer page with step-by-step animation
- Dynamic task input (add/remove tasks)
- Timeline slot visualization, color-coded status
- Final output with total profit and scheduled tasks

## Tech Stack & Constraints
- React.js (Functional components)
- No JSX — uses `React.createElement` only
- No TypeScript
- No external visualization libraries (D3/Chart.js) — pure CSS + JS animations
- Routing with `react-router-dom` (no JSX)

## Folder Structure
```
task-scheduling-visualizer/
  public/
    index.html
  src/
    algorithms/
      taskScheduling.js       # Greedy algorithm + steps for visualization
    components/
      Header/
        Header.js
      Dashboard/
        Dashboard.js
      Visualizer/
        Visualizer.js          # Interactive visualizer, animations
      common/
        Card.js
    styles/
      styles.css
    App.js
    index.js
  package.json
  README.md
```

## Algorithm
Greedy Task Scheduling:
1. Sort tasks by profit (descending).
2. For each task, assign it to the latest available slot before its deadline.
3. If no slot is available, reject the task.

Time Complexity: O(n^2) (O(n log n) sorting + O(n^2) slot search), Space: O(n)

## How to Run
1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

Open `http://localhost:3000` in your browser.

## Notes for Viva
- `src/algorithms/taskScheduling.js` contains detailed comments about why the greedy approach is optimal and step descriptions used by the visualizer.
- Visualizer uses the `steps` array returned by the algorithm to animate the process using `setTimeout`.

---

If you'd like, I can:
- Add unit tests for the algorithm
- Add a build script and deploy instructions
- Polish colors or add dark/light themes

