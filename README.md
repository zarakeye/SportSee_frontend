# SportSee_frontend

This repo contains all the source code to run the sports analytics dashboard of a SportSee user.

## 1. Tech stack: React + TypeScript + Vite + TailwindCSS + ReCharts

This project is implemented with React and TypeScript, using Vite as the bundler.
TailwindCSS is used for styling.
ReCharts is used for the charting components.

## 2. Installation

To install the dependencies, run the following command:

```bash
yarn install
```

## 3. Usage

To start the development server, run the following command:

```bash
yarn dev
```

The project will be available at [http://localhost:5173](http://localhost:5173) by default in the browser.

To build the production version, run the following command:

```bash
yarn build
```

then,  run :

```bash
yarn preview
```

## 4. Endpoints

This project has for now only one endpoint: `http://localhost:5173/${userId}` which will redirect to the profile page of the user.

## 5. Mocks

This project includes mocks in the public folder for the endpoints. A system of Fallback is implemented to make the project work without an API.

## 6. Deployment

This project is deployed on Vercel. The deployment is available at [SportSee Frontend Deployment](https://sportsee-frontend.vercel.app/).