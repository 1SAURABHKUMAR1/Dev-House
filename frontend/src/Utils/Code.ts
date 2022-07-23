import { templateFormat } from 'Types';

// '/app/' => for folder
//  '/package.json' => for file
//  '/app/package.json' => file under folder

export const codes: {
    CPP: templateFormat;
    PYTHON: templateFormat;
    JAVASCRIPT: templateFormat;
    TYPESCRIPT: templateFormat;
    VANILLA: templateFormat;
    'VANILLA TYPESCRIPT': templateFormat;
    REACT: templateFormat;
    'REACT TYPESCRIPT': templateFormat;
} = {
    CPP: {
        'index.cpp': {
            code: `#include<iostream>
         using namespace std;
         int main() {
            cout<<"Hello world";
         }`,
        },
    },
    JAVASCRIPT: {
        'index.js': {
            code: `console.log("Hello World")`,
        },
    },
    TYPESCRIPT: {
        'index.ts': {
            code: `console.log('hello')`,
        },
    },
    PYTHON: {
        'index.py': {
            code: `print('Hello World')`,
        },
    },
    VANILLA: {
        '/src/index.js': {
            code: `import "./styles.css";
    document.getElementById("app").innerHTML = \`
    <h1>Hello World</h1>
    <div>
      We use the same configuration as Parcel to bundle this sandbox, you can find more
      info about Parcel
      <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
    </div>
    \`;
    `,
        },
        '/src/styles.css': {
            code: `body { font-family: sans-serif;}`,
        },
        '/index.html': {
            code: `<!DOCTYPE html>
    <html>
    <head>
      <title>Parcel Sandbox</title>
      <meta charset="UTF-8" />
    </head>
    <body>
      <div id="app"></div>
      <script src="src/index.js">
      </script>
    </body>
    </html>`,
        },
    },
    REACT: {
        '/App.js': {
            code: `export default function App() {
        return <h1>Hello World</h1>
      }
      `,
        },
        '/index.js': {
            code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
</StrictMode>
);`,
        },
        '/styles.css': {
            code: `body {
        font-family: sans-serif;
        -webkit-font-smoothing: auto;
        -moz-font-smoothing: auto;
        -moz-osx-font-smoothing: grayscale;
        font-smoothing: auto;
        text-rendering: optimizeLegibility;
        font-smooth: always;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
      }
      h1 {
        font-size: 1.5rem;
      }`,
        },
        '/public/index.html': {
            code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>`,
        },
    },
    'VANILLA TYPESCRIPT': {
        '/src/index.ts': {
            code: `import "./styles.css";
      document.getElementById("app").innerHTML = \`
      <h1>Hello World</h1>
      <div>
        We use the same configuration as Parcel to bundle this sandbox, you can find more
        info about Parcel
        <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
      </div>
      \`;
      `,
        },
        '/src/styles.css': {
            code: `body {
        font-family: sans-serif;
      }
            `,
        },
        '/index.html': {
            code: `<!DOCTYPE html>
      <html>
      <head>
        <title>Parcel Sandbox</title>
        <meta charset="UTF-8" />
      </head>
      <body>
        <div id="app"></div>
        <script src="src/index.ts">
        </script>
      </body>
      </html>`,
        },
    },
    'REACT TYPESCRIPT': {
        '/App.tsx': {
            code: `export default function App(): JSX.Element {
          return <h1>Hello World</h1>
        }
        `,
        },
        '/index.tsx': {
            code: `import React, { StrictMode } from "react";
        import { createRoot } from "react-dom/client";
        import "./styles.css";
        import App from "./App";
        const root = createRoot(document.getElementById("root"));
        root.render(
          <StrictMode>
            <App />
          </StrictMode>
        );`,
        },
        '/styles.css': {
            code: `body {
          font-family: sans-serif;
          -webkit-font-smoothing: auto;
          -moz-font-smoothing: auto;
          -moz-osx-font-smoothing: grayscale;
          font-smoothing: auto;
          text-rendering: optimizeLegibility;
          font-smooth: always;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }
        h1 {
          font-size: 1.5rem;
        }`,
        },
        '/public/index.html': {
            code: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>`,
        },
    },
};
