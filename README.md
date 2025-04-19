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
   git clone https://github.com/BOCK-CHAIN/BockDocs.git
   cd BockDocs
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Add your Firebase configuration to `.env`as mentioned .env.example


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

## GCP Deployment Guide (Vite + React with Nginx)

This guide explains how to deploy a **Vite + React** application on a **Google Cloud Platform (GCP)** Virtual Machine (VM) using **Nginx** to serve static files.

## Prerequisites
- A GCP account and a configured VM instance.
- Basic familiarity with SSH and Linux commands.
- Firewall rules allowing port 80 (HTTP) on your GCP VM.

## Steps

### 1. Install Node.js and npm on GCP VM
Install **Node.js** (v14 or later) and **npm** to build the Vite project.

```bash
sudo apt update
sudo apt install -y nodejs npm
```

Verify installation:
```bash
node -v
npm -v
```

### 2. Build the React + Vite Project
Clone or upload your Vite + React project to the VM, then build it.

```bash
git clone https://github.com/BOCK-CHAIN/BockDocs.git
cd BockDocs
```

Install dependencies:
```bash
npm install
```

Build the app for production:
```bash
npm run build
```

This generates a `dist/` folder containing the static site files.

### 3. Install and Configure Nginx
Install **Nginx** and set it up to serve the static files:

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

Remove default Nginx files and copy the static build:
```bash
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
```

### 4. Access Your Site
Find your VM's external IP in the GCP Console and visit it in a browser:

```
http://[YOUR_EXTERNAL_IP]
```

> **Note**: Ensure port 80 (HTTP) is open in your GCP VM's firewall settings.

## Important Considerations
- **Firewall Rules**: Verify that port 80 (HTTP) is allowed in your GCP firewall to enable public access.
- **Nginx Configuration**: Nginx serves content from `/var/www/html` by default. Ensure the `dist/` folder contents are correctly copied to this directory.
- **Auto-Start Nginx**: Confirm Nginx starts on reboot:
  ```bash
  sudo systemctl enable nginx
  ```

## Troubleshooting
- If the site doesn't load, check Nginx status: `sudo systemctl status nginx`.
- Verify file permissions in `/var/www/html`: `sudo chmod -R 755 /var/www/html`.
- Confirm the `dist/` folder contains the static files.
