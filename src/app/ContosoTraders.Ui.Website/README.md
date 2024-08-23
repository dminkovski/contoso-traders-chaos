# Contoso Traders UI

A Vite-based project using TypeScript, React, and Redux.

## Table of Contents

- [Contoso Traders UI](#contoso-traders-ui)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [Configuration](#configuration)
    - [Vite Configuration](#vite-configuration)
  - [Environment Variables](#environment-variables)
  - [Usage](#usage)
  - [Build](#build)
- [Contributing](#contributing)
- [Trademarks](#trademarks)

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone
    cd
    ```

2. **Install dependencies**:
    ```bash
    npm ci
    ```

## Project Structure

Here is an overview of the project structure:

```bash
├── index.html # Application entry point
├── vite.config.ts # Vite configuration
├── .env # Environment variables local
├── .env.production # Environment variables for production
├── tsconfig.json # TypeScript configuration
├── package.json # Project dependencies and scripts
├── package-lock.json # Project dependencies locked to version
├── README.md # Project documentation
src/
│
├── public/ # Static assets like images, favicon, etc. referenced from the index.html
├── src/ # Source files
│ ├── assets/ # SVGs, images etc.
│ ├── components/ # React components
│ ├── config/ # Redux store configuration, axios interceptors, middleware, MSAL
│ ├── services/ # API services for the backend
│ ├── index.tsx # React application entry point
│ └── app.tsx # App component with routes
```


## Configuration

The main configurations for the project are located in the `config/` folder.

### Vite Configuration

The Vite configuration is defined in `config/vite.config.ts`. You can modify this file to change how the development server, build process, and plugins behave.

## Environment Variables

Environment variables are managed using `.env` files. Create a `.env` file at the root of the project to define environment-specific variables.
These variables can be accessed in your TypeScript and React files using `import.meta.env.VITE_VARIABLE_NAME`. You can see them in `config/constants.ts`

## Usage

To start the development server:

```bash
npm run dev
```

This will start a Vite development server with hot-reloading, allowing you to see changes in real-time.

## Build
To build the project for production:

```bash
npm run build
```
The output will be placed in the dist/ directory. The production build is optimized and minified.

To preview the production build:
```bash
npm run preview
```

This will start a local server to preview the built project.

# Contributing
This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the Microsoft Open Source Code of Conduct. For more information see the Code of Conduct FAQ or contact opencode@microsoft.com with any additional questions or comments.

# Trademarks
This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow Microsoft's Trademark & Brand Guidelines. Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party's policies.