# MERN Estate

This is a MERN estate web application styled with Tailwind CSS.

## Features

- **PostgreSQL**: Database for storing real estate listings and user data.
- **Express**: Backend framework to handle API requests.
- **React**: Frontend library for building user interfaces.
- **Node.js**: Server environment to run Express.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sup-neupane/mern-estate.git
    cd mern-estate
    ```

2. Install dependencies for the backend:
    ```bash
    cd api
    npm install
    ```

3. Install dependencies for the frontend:
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1. Start the PostgreSQL server and create a database for the project.

2. Configure the database connection settings in the backend (`api/config/config.js`).

3. Start the backend server:
    ```bash
    cd api
    npm start
    ```

4. Start the frontend development server:
    ```bash
    cd ../client
    npm start
    ```

5. The application should now be running at `http://localhost:3000`

## Project Structure

- `api/`: Contains the backend code (Express server, PostgreSQL models, and routes).
- `client/`: Contains the frontend code (React components and pages).
- `.gitignore`: Specifies files to be ignored by Git.
- `package.json`: Lists dependencies and scripts for the project.
- `package-lock.json`: Describes the exact tree of modules that were installed.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.



## Acknowledgements

- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
