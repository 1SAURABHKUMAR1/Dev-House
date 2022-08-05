import { templateFormat } from 'Types';

// '/app/' => for folder
//  '/package.json' => for file
//  '/app/package.json' => file under folder

export const codes: {
    CPP: templateFormat;
    PYTHON: templateFormat;
    JAVASCRIPT: templateFormat;
    TYPESCRIPT: templateFormat;
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
        '/buildConfig.json': {
            code: `{
  "entry_file":"index.js"
}`,
        },
    },
    TYPESCRIPT: {
        'index.ts': {
            code: `console.log('hello')`,
        },
        '/buildConfig.json': {
            code: `{
  "entry_file":"index.ts"
}`,
        },
    },
    PYTHON: {
        'index.py': {
            code: `print('Hello World')`,
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
import App from "./App.js";

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
            code: ` <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
               <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                  name="description"
                  content="Web site created using create-react-app"
                />
                <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                <title>Dev - House</title>
                <style></style>
                </head>
                <body>
                <div id='root'></div>
              </body>
            </html>
            `,
        },
        '/buildConfig.json': {
            code: `{
  "entry_file":"index.js",
  "entry_html_file": "/public/index.html"
}`,
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
            code: ` <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
               <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                  name="description"
                  content="Web site created using create-react-app"
                />
                <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                <title>Dev - House</title>
                <style></style>
                </head>
                <body>
                <div id='root'></div>
              </body>
            </html>
            `,
        },
        '/buildConfig.json': {
            code: `{
  "entry_file":"index.tsx",
  "entry_html_file": "/public/index.html"
}`,
        },
        '/tsconfig.json': {
            code: `{
              "compilerOptions": {
                  "allowJs": true,
                  "esModuleInterop": true,
                  "forceConsistentCasingInFileNames": true,
                  "isolatedModules": true,
                  "lib": ["DOM", "DOM.Iterable", "ESNext"],
                  "module": "ESNext",
                  "noEmit": true,
                  "resolveJsonModule": true,
                  "skipLibCheck": true,
                  "strict": true,
                  "useUnknownInCatchVariables": false,
                  "target": "ESNext",
              },
            }`,
        },
    },
};
