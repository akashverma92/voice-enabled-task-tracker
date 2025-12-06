# Voice-Enabled Task Tracker

A full-stack task management application that allows users to manage tasks using voice commands. Built as an SDE Assignment.

## 1. Project Setup

### a. Prerequisites
*   **Node.js**: v16.0.0 or higher recommended.
*   **MongoDB**: Local installation or MongoDB Atlas connection string.
*   **Browser**: Google Chrome or Microsoft Edge (required for Web Speech API support).

### b. Install Steps

**1. Clone the repository:**
```bash
git clone <repository-url>
cd voice-enabled-task-tracker
```

**2. Backend Setup:**
```bash
cd backend
npm install
```

**3. Frontend Setup:**
```bash
cd ../frontend
npm install
```

### c. Configuration

**Backend:**
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tasktracker  # Or your Atlas URI
```

**Email Configuration:**
> **Note:** Email sending/receiving functionality is not currently implemented in this version of the application. No configuration is required.

### d. How to Run Everything Locally

**1. Start the Backend:**
Open a terminal in the `backend` directory:
```bash
npm run dev
```
*Server will start on http://localhost:5000*

**2. Start the Frontend:**
Open a new terminal in the `frontend` directory:
```bash
npm run dev
```
*Frontend will start on http://localhost:5173 (or similar)*

### e. Seed Data
No initial seed scripts are required. The application starts with an empty database. You can create tasks via the UI or Voice commands.

---

## 2. Tech Stack

*   **Frontend**:
    *   **Framework**: React (via Vite)
    *   **Styling**: Tailwind CSS
    *   **Voice/AI**: Web Speech API (Native Browser API)
    *   **Notifications**: `react-hot-toast`
    *   **Date Parsing**: `chrono-node` (Natural language date parsing)
    *   **HTTP Client**: Native `fetch` / Custom hooks

*   **Backend**:
    *   **Runtime**: Node.js
    *   **Framework**: Express.js
    *   **Database**: MongoDB (with Mongoose ODM)
    *   **Utilities**: `dotenv` (Config), `cors` (Cross-Origin Resource Sharing)

---

## 3. API Documentation

Base URL: `http://localhost:5000/api`

### Tasks

| Method | Endpoint | Description | Request Body / Params | Example Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `http://localhost:5000/api/tasks` | Get all tasks | None | `[{ "_id": "...", "title": "Task 1" }]` |
| **POST** | `http://localhost:5000/api/tasks` | Create a new task | `{ "title": "Buy milk", "description": "...", "priority": "High" }` | `{ "_id": "...", "title": "Buy milk" }` |
| **PUT** | `http://localhost:5000/api/tasks/:id` | Update a task | `{ "status": "Completed" }` | `{ "_id": "...", "status": "Completed" }` |
| **DELETE** | `http://localhost:5000/api/tasks/:id` | Delete a task | URL Param: `id` | `{ "id": "..." }` |

**Error Response Example:**
```json
{
  "message": "Please add a text field"
}
```

---

## 4. Decisions & Assumptions

### a. Key Design Decisions
*   **Atomic Architecture (Frontend)**: The frontend is structured by "features" (e.g., `features/task`) to ensure modularity and scalability. Each feature contains its own components, hooks, and services.
*   **Web Speech API**: Chosen over paid cloud APIs (like Google Cloud Speech or OpenAI Whisper) to keep the project lightweight, zero-cost, and reduce latency for a smoother user experience.
*   **Natural Language Date Parsing**: Integrated `chrono-node` to allow users to say things like "Remind me to call John tomorrow at 5pm", which automatically extracts the due date.

### b. Assumptions
*   **Browser Support**: Assumed the user is using a Chromium-based browser (Chrome, Edge, Brave) as the Web Speech API has the best support there.
*   **Email Functionality**: Assumed to be a future enhancement. The current scope focuses on the core "Voice-Enabled" aspect of the tracker.
*   **Single User**: The current implementation assumes a single-user environment (no authentication/login implemented yet).

---

## 5. AI Tools Usage

### a. Tools Used
*   **Google DeepMind's Antigravity**: An advanced agentic AI coding assistant.

### b. How They Helped
*   **Refactoring**: Helped convert the monolithic frontend structure into a clean, atomic architecture.
*   **Debugging**: Assisted in fixing issues with the Voice Recognition hook, specifically handling silence timeouts and manual stop functionality.
*   **Documentation**: Generated this comprehensive README.md based on the codebase analysis.

### c. Notable Approaches
*   **Agentic Workflow**: The AI autonomously explored the codebase, identified dependencies, and verified feature implementation (like the lack of email support) before writing documentation, ensuring accuracy.
