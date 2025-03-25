# Bock Docs

A modern document editing and management platform with rich text editing capabilities.

## Features

- Rich text editor with advanced formatting
- Document organization and search
- Export to PDF, HTML, and plain text
- Responsive design with dark mode support
- User authentication and document sharing

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/bock-docs.git
   cd bock-docs
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase configuration details

4. Start the development server:
   ```
   npm run dev
   ```

### Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Add your Firebase configuration to `.env.local`

## Deployment

1. Build the project:
   ```
   npm run build
   ```

2. Deploy to Firebase:
   ```
   npm install -g firebase-tools
   firebase login
   firebase init
   firebase deploy
   ```

## Project Structure

- `src/components`: Reusable UI components
- `src/contexts`: React contexts for state management
- `src/pages`: Page components
- `src/services`: API and service functions
- `src/config.js`: Firebase configuration

## Technologies Used

- React.js
- Firebase (Authentication, Firestore)
- TipTap Editor
- Tailwind CSS
- Vite

