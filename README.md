Pet Ledger is a simple React application for keeping track of pets and their veterinary records.

Users can add pets, view their details, automatically calculate their age from their date of birth, and add multiple veterinary checks to each pet.

The application uses **React**, **SCSS**, **Vite**, and **JSON Server**.

---

## Features

- Add a new pet
- View all pets
- Store a pet's:
    - Name
    - Species
    - Breed
    - Date of birth
    - Notes
- Automatically calculate the pet's current age
- Add multiple vet checks to each pet
- Store vet check:
    - Date
    - Reason / check-up
    - Vet notes
    - Next appointment
- Store data using `db.json`
- Use JSON Server as a simple REST API
- Component-based React structure
- Each component has its own JSX and SCSS file
- Centralised SCSS colour variables
- Responsive layout
- Header and footer

---

## Technologies

- **React** - UI library
- **JavaScript** - Application logic
- **SCSS** - Styling
- **Vite** - Development server and build tool
- **JSON Server** - Simple REST API and database

---

## Project Structure

```text
pet-ledger/
│
├── db.json
├── package.json
├── package-lock.json
├── README.md
│
└── src/
    │
    ├── main.jsx
    ├── App.jsx
    ├── App.scss
    │
    ├── styles/
    │   ├── _variables.scss
    │   ├── normalize.scss
    │   └── reset.scss
    │
    └── components/
        │
        ├── Header/
        │   ├── Header.jsx
        │   └── Header.scss
        │
        ├── Footer/
        │   ├── Footer.jsx
        │   └── Footer.scss
        │
        ├── PetForm/
        │   ├── PetForm.jsx
        │   └── PetForm.scss
        │
        ├── PetList/
        │   ├── PetList.jsx
        │   └── PetList.scss
        │
        ├── PetCard/
        │   ├── PetCard.jsx
        │   └── PetCard.scss
        │
        └── VetCheckForm/
            ├── VetCheckForm.jsx
            └── VetCheckForm.scss


Getting Started
Prerequisites

You will need to have Node.js installed on your computer.

You can check if Node.js is installed by running:

node --version

You should also have npm available:

npm --version
Installation

Clone the project or download it to your computer.

Navigate into the project folder:

cd pet-ledger

Install the required dependencies:

npm install
Running the Application

The application uses two servers:

Vite for the React application
JSON Server for the database/API

You need to run both.

Start JSON Server

Open a terminal and run:

npm run server

JSON Server will run on:

http://localhost:3001

The pets endpoint is:

http://localhost:3001/pets
Start React

Open a second terminal and run:

npm run dev

Open the URL shown in your terminal in your browser.

Available Scripts

The main scripts used by the project are:

Development server
npm run dev

Starts the Vite development server.

JSON Server
npm run server

Starts JSON Server using db.json.