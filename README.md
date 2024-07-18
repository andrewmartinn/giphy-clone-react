# GIPHY React Clone
![giphy-home](https://github.com/user-attachments/assets/aa44360b-38da-4e22-aef3-96fab0d316ad)
Homepage

![giphy-categories](https://github.com/user-attachments/assets/35e719f0-9972-46d9-b10a-199c6bcf17ba)
Movies Category page

![giphy-search](https://github.com/user-attachments/assets/159ba5c3-5b8b-4536-bfbd-8a35f7771f97)
Search page

![gif](https://github.com/user-attachments/assets/43e038bf-e969-4cbb-8a04-d1c174a32c30)
Gif Details page


React app inspired by GIPHY, allowing users to explore trending GIFs, search for GIFs, stickers, or text, favorite their preferred GIFs, view detailed GIF pages, and browse through various categories. The app uses the official GIPHY API for fetching and displaying GIF data.

[View Live Demo](https://giphy-clone-react-app.netlify.app/)


## Technologies Used

- [Vite](https://vitejs.dev/): Fast, opinionated web dev build tool
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development
- [React Router](https://reactrouter.com/): Declarative routing for React applications
- [React Icons](https://react-icons.github.io/react-icons/):A library containing popular icons for React projects, used for displaying various icons throughout the application.
- [Framer Motion](https://www.framer.com/motion/introduction/): Animation library for React
- [GIPHY API](https://developers.giphy.com/docs/api/#quick-start-guide): Official GIPHY JavaScript API for fetching data from GIPHY API

## Project Features

- **Trending GIFs:** Display trending GIFs fetched from the GIPHY API.
- **Search Functionality:** Search for GIFs, stickers, or text using keywords.
- **Favorite GIFs:** Ability to mark and save favorite GIFs locally.
- **GIF Details Page:** View detailed information and options for each GIF, including sharing and embedding.
- **Category Browsing:** Browse through different categories of GIFs.
- **Share and Embed:** Share GIFs via external links or embed them in other platforms.

## Project Outcomes

- **Responsive Design:** Implemented responsive design principles using Tailwind CSS, ensuring the application is optimized for various screen sizes and devices.
- **Masonry Grid Layout:** Designed and implemented a masonry grid layout for displaying GIFs, enhancing the visual appeal and user experience of the app.

- **Third-Party API Integration:** Successfully interacted with the official GIPHY API to fetch and display GIFs, stickers, and text dynamically based on user queries and preferences.

- **Context API:** Utilized the Context API to manage global application state efficiently. This included managing gifs, user favorites, filters, and other application-wide data.

- **Share and Embed Functionality:** Implemented share/embed functionality using web APIs to enable users to share GIFs by generating a shareable link and embed GIFs on external websites using iframe emebed code dynamically. Incorporated copy-to-clipboard functionality for ease of use.

- **Animations using Framer Motion:** Integrated Framer Motion to apply engaging animations throughout the app, enhancing user interaction and visual appeal. Animations were applied to GIF hover effects, transitions between components, and more, providing a seamless and dynamic user experience.

## Project Setup

This project was bootstrapped with [Vite](https://vitejs.dev/guide/)

To get started you need to:

- Clone the project
- Install listed dependencies
- Run available scripts
- Create a env file

### Install dependencies

```
yarn install
```

### Create an enviroment file to store GIPHY API Key

```
VITE_APP_GIPHY_API_KEY=your-api-key-here
```

### Run React dev server

```
yarn dev
```

### To build for production

```
yarn build
```

## Deployment

To deploy this project run

```
yarn run deploy
```
