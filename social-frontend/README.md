# Social Media Frontend

A React-based frontend for a social media application that connects to a microservice backend. This application displays users, their posts, and post comments in a simple, user-friendly interface.

## Features

- View top users sorted by post count
- Browse user posts
- View comments on posts
- Authentication with JWT token

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Backend API (social-media-microservice) running on port 5000

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/srexrg/social-frontend.git
   cd social-frontend
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the project root (optional):
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

## Running the Application

Start the development server:
```
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

1. When the application loads, you'll need to provide an authentication token in the input field at the top of the page.
2. Click "Login" to authenticate and fetch the list of top users.
3. Click on a user to view their posts.
4. Click on a post to view its comments.

## Application Structure

- **Users Section**: Displays the top 5 users based on post count
- **Posts Section**: Shows posts from the selected user
- **Comments Section**: Displays comments for the selected post

## API Integration

The frontend connects to a microservice backend at `http://localhost:5000` with the following endpoints:
- `/test/users` - Get all users
- `/test/users/:userId/post` - Get posts by user ID
- `/test/post/:postId/comments` - Get comments for a post

## Technologies Used

- React
- TypeScript
- Axios for API requests
- CSS for styling

## License

[Your license information]

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
