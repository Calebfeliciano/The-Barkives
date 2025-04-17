# The Barkives

## Description

The Barkives is a pet management application designed to help users organize and track essential information about their pets. Users can store details such as name, birth date, breed, and color, as well as manage healthcare records, services, and appointments through an integrated calendar. Built with the MERN stack, this application ensures data security through authentication. Key technologies include a React and TypeScript front end, a GraphQL API, and a MongoDB Atlas database for data storage.

## Table of Contents

- [Link to Application](#link-to-application)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Link to Application

Link goes here

## Installation

The Barkives is accessible via any web browser using the link above. No installation is required. To run the application locally for development or customization, follow these steps:

**_Note: Ensure you have access to a GraphQL-compatible database, such as MongoDB Compass._**

1. Open your terminal and navigate to the directory where you'd like to store the repository.

2. Clone the repository using the following command:

   ```sh
   git clone https://github.com/Calebfeliciano/The-Barkives.git
   ```

3. Navigate into the project directory:

   ```sh
   cd The-Barkives
   ```

4. Rename the `.env.EXAMPLE` file located in the `server` folder to `.env`.

5. Install the required dependencies:

   ```sh
   npm install
   ```

6. Build the application:

   ```sh
   npm run build
   ```

7. Start the server and launch the application in your browser:

   ```sh
   npm run develop
   ```

## Usage

The Barkives can be accessed via a web browser or run locally. Follow the installation steps above to set up the local environment. Note that the GraphQL server runs on port 3001, while the Vite development server runs on port 3000.

1. Visit the application link to access The Barkives home page, as shown below:

   ![Barkives home page](./assets/home.png)

2. Create an account by clicking the "Login/Sign Up" button.

3. After signing up, you'll be logged in automatically. Add pets to your database by clicking "Add Pet". Fill out your pet's information, then hit "Save" to save the pet to the database.

4. Select a pet by clicking "Select Pet" and choosing a pet from the list.

5. View detailed information about the selected pet by navigating through the tabs ("Healthcare," "Services," or "Calendar").

6. To remove a pet, return to the home page via the "Home" tab, click "Remove Pet," and click "Remove" on the pet you'd like to remove.

7. When finished, log out by clicking the "Logout" button at the top.

## Credits

This project was developed by Group 1 of the Rutgers University Coding Bootcamp, section RUT-VIRT-FSF-PT-10-2024-U-LOLC-MWTH. Team members include Ashleigh Brown, Caleb Feliciano, Alex Newcomer, Tyreone Sarpong, and Amelia Alvarado. Below are links to our GitHub profiles:

- [Ashleigh Brown](https://github.com/AshB88)
- [Caleb Feliciano](https://github.com/Calebfeliciano)
- [Alex Newcomer](https://github.com/AlexMNewcomer)
- [Tyreone Sarpong](https://github.com/Tyreone58)
- [Amelia Alvarado](https://github.com/amelia1105)

This project utilized starter code from a previous assignment (RUT-VIRT-FSF-PT-10-2024-U-LOL > 18-MERN-and-Authentication > 02-Challenge > Main). While the starter code provided the foundation for authentication, authorization, and database connection, we extensively modified and expanded it. Updates included new models, pages, components, queries, mutations, interfaces, type definitions, resolvers, and custom styling. Additionally, we leveraged tools like ChatGPT and GitHub Copilot to enhance our code.

## License

This project is licensed under the MIT License. For more details, click the "MIT license" tab at the top of this README.
