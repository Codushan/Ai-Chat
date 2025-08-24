# 🚀 Modern AI Chat Interface

This is a sleek and responsive AI chat application built with React and Next.js, featuring both standard and real-time streaming chat functionalities. The application demonstrates dynamic inline styling to adapt its layout based on screen size, providing an optimal user experience across various devices.

---

## ✨ Features

* **Standard Chat**: Send a message and receive a complete response once the AI has finished processing.

* **Streaming Chat**: Experience real-time AI responses, with text appearing word by word as it's generated.

* **Modern UI**: A clean, intuitive, and beautifully designed user interface using only inline styles.

* **Responsive Design**: The layout dynamically adjusts for optimal viewing on mobile, tablet, and desktop screens.

---

## 🛠️ Technology Stack

* **Frontend**: React, Next.js

* **Styling**: Pure Inline CSS (no external CSS files or frameworks)

* **API Integration**: JavaScript Fetch API

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

* Node.js (v18 or higher recommended)

* npm or Yarn

### Installation

1.  **Clone the repository**:

    ```bash
    git clone [https://your-repo-link.git](https://your-repo-link.git)
    cd your-repo-name
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up API endpoints**:
    This application expects two API endpoints: `/api/chat` for standard (non-streaming) responses and `/api/chat-stream` for streaming responses. You'll need to implement these endpoints on your backend (e.g., using Next.js API routes or a separate server) to connect to your AI model (e.g., Google Gemini API).

    * For `/api/chat`, the endpoint should return a JSON object like `{ response: "AI's full answer" }`.

    * For `/api/chat-stream`, the endpoint should stream plain text chunks.

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev