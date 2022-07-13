import { fileFormat } from 'Types';

export const codes: {
    CPP: fileFormat[];
    PYTHON: fileFormat[];
    JAVASCRIPT: fileFormat[];
    TYPESCRIPT: fileFormat[];
    VANILLA: fileFormat[];
    'VANILLA TYPESCRIPT': fileFormat[];
    REACT: fileFormat[];
    'REACT TYPESCRIPT': fileFormat[];
} = {
    CPP: [
        {
            id: 'cpp',
            name: 'index.cpp',
            directory: null,
            type: 'file',
            code: `#include<iostream>
         using namespace std;
         int main() {
            cout<<"Hello world";
         }`,
        },
    ],
    JAVASCRIPT: [
        {
            id: 'javascript',
            name: 'index.js',
            directory: null,
            type: 'file',
            code: `console.log("Hello World")`,
        },
    ],
    TYPESCRIPT: [],
    PYTHON: [
        {
            id: 'javascript',
            name: 'index.py',
            directory: null,
            type: 'file',
            code: `print('Hello World')`,
        },
    ],
    VANILLA: [
        {
            id: 'wRo98',
            name: 'index.js',
            directory: 'GXOoy',
            type: 'file',
            code: '',
        },
        {
            id: 'rVkv2',
            name: 'styles.css',
            directory: 'GXOoy',
            type: 'file',
            code: '',
        },
        {
            id: 'BA1N',
            name: 'index.html',
            directory: 'rgkK4',
            type: 'file',
            code: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                
            </body>
            </html>`,
        },
    ],
    'VANILLA TYPESCRIPT': [],
    REACT: [
        {
            id: 'wRo98',
            name: 'index.js',
            directory: 'GXOoy',
            type: 'file',
            code: 'code index.js',
        },
        {
            id: 'rVkv2',
            name: 'styles.css',
            directory: 'GXOoy',
            type: 'file',
            code: 'code style.css',
        },
        {
            id: 'BA1N',
            name: 'index.html',
            directory: 'rgkK4',
            type: 'file',
            code: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta\n      name="viewport"\n      content="width=device-width, initial-scale=1, shrink-to-fit=no"\n    />\n    <meta name="theme-color" content="#000000" />\n    <title>Demo Project</title>\n    <!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />\n    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />\n    <!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n    <title>React App</title>\n  </head>\n\n  <body>\n    <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n    <div id="root"></div>\n    <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  </body>\n</html>\n',
        },
        { id: 'rgkK4', name: 'public', directory: null, type: 'directory' },
        { id: 'GXOoy', name: 'src', directory: null, type: 'directory' },
    ],
    'REACT TYPESCRIPT': [],
};
