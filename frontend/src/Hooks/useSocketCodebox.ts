import { useEffect, useState } from 'react';
import {
    ACTIONS_ADD_CODE_USER,
    ACTIONS_CODE_CHAT,
    ACTIONS_CODE_LEAVE,
    ACTIONS_REMOVE_CODE_USER,
    ACTIONS_SEND_CODE_SERVER_CODE,
} from 'Socket/actions';
import {
    socketAddUser,
    socketChat,
    socketCode,
    socketEmit,
    socketRemoveUser,
} from 'Socket/codeboxSocketHandler';

import { socket } from 'Socket/socket';

import {
    chatType,
    initialChatType,
    socketCodeboxUser,
    useSocketCodebox as useSocketCodeboxType,
} from 'Types';

const useSocketCodebox: useSocketCodeboxType = (codeboxId, user) => {
    const [users, setUsers] = useState<Array<socketCodeboxUser>>([]);
    const [chats, setChats] = useState<initialChatType>([]);
    const [monacoEditorCode, setMonacoCode] = useState<string>('');

    // const structure: fileFormat[] = [
    //     {
    //         id: 'ZGQK6',
    //         name: 'package.json',
    //         directory: null,
    //         type: 'file',
    //         code: '{\n  "name": "file-tree-live",\n  "version": "1.0.0",\n  "description": "",\n  "keywords": [],\n  "main": "src/index.js",\n  "dependencies": {\n    "react": "16.8.6",\n    "react-dom": "16.8.6",\n    "react-highlight": "0.12.0",\n    "react-scripts": "3.0.1",\n    "react-ui": "1.0.0-beta.4"\n  },\n  "devDependencies": {\n    "typescript": "3.3.3"\n  },\n  "scripts": {\n    "start": "react-scripts start",\n    "build": "react-scripts build",\n    "test": "react-scripts test --env=jsdom",\n    "eject": "react-scripts eject"\n  },\n  "browserslist": [\n    ">0.2%",\n    "not dead",\n    "not ie <= 11",\n    "not op_mini all"\n  ]\n}',
    //     },
    //     {
    //         id: 'wRo98',
    //         name: 'index.js',
    //         directory: 'GXOoy',
    //         type: 'file',
    //         code: "import React from 'react'\nimport ReactDOM from 'react-dom'\nimport { Element, ThemeProvider } from 'react-ui'\n\nimport Sidebar from './components/sidebar'\nimport FileTree from './components/file-tree'\nimport Code from './editor/code'\nimport OpenInSandbox from './editor/open-in-sandbox'\nimport { useFilesFromSandbox } from './utils'\n\nimport './styles.css'\nimport theme from './theme'\n\n/* SANDBOX ID\n *\n *\n *\n */\nconst CURRENT_SANDBOX_ID = '84jkx'\n/*\n *\n *\n *\n */\n\nconst dummyFiles = [\n  { dummy: true, id: 1, name: 'loading...', type: 'directory' }\n]\n\nfunction App() {\n  const [files, setFiles] = React.useState(dummyFiles)\n  const [selectedFile, setSelectedFile] = React.useState(null)\n\n  useFilesFromSandbox(CURRENT_SANDBOX_ID, files => {\n    // default selection, find any index.js\n    if (!selectedFile) {\n      setSelectedFile(files.find(file => file.name === 'index.js'))\n    }\n\n    setFiles(files)\n  })\n\n  const onSelect = file => setSelectedFile(file)\n\n  return (\n    <ThemeProvider theme={theme}>\n      <Element as=\"main\" css={{ display: 'flex' }}>\n        <Sidebar>\n          <FileTree\n            files={files}\n            selectedFile={selectedFile}\n            onSelect={onSelect}\n          />\n        </Sidebar>\n        <Code selectedFile={selectedFile} />\n        <OpenInSandbox id={CURRENT_SANDBOX_ID} />\n      </Element>\n    </ThemeProvider>\n  )\n}\n\nconst rootElement = document.getElementById('root')\nReactDOM.render(<App />, rootElement)\n",
    //     },
    //     {
    //         id: '004P5',
    //         name: 'sidebar.js',
    //         directory: 'A6k6p',
    //         type: 'file',
    //         code: "import React from 'react'\nimport { Element } from 'react-ui'\n\nfunction Sidebar(props) {\n  return (\n    <Element\n      as=\"aside\"\n      {...props}\n      css={{\n        display: 'block',\n        width: 250,\n        height: '100vh',\n        borderRight: '2px solid',\n        borderColor: 'grays.500',\n        paddingTop: 3\n      }}\n    />\n  )\n}\n\nexport default Sidebar\n",
    //     },
    //     {
    //         id: 'vg8xr',
    //         name: 'theme.js',
    //         directory: 'GXOoy',
    //         type: 'file',
    //         code: "// this follows the System UI Theme Specification\n// Ref: https://system-ui.com/theme\n\nconst colors = {\n  white: '#fff',\n  grays: {\n    100: '#fff9f9', // found this lingering around\n    200: '#e6e6e6', // danny's gray-0\n    300: '#999999', // danny's gray-1\n    400: '#757575', // danny's gray-2\n    500: '#242424', // danny's dark-3\n    600: 'pink', // doesn't exist yet\n    700: '#151515', // danny's dark-2\n    800: '#040404', // danny's dark-1\n    900: '#111111' // danny's dark-0\n  },\n  blues: {\n    300: '#6CC7F6', // danny's teal\n    600: '#0971f1' // danny's blue\n  }\n}\n\nconst theme = {\n  colors,\n  space: [0, 4, 8, 16, 32],\n  fontSizes: [0, 12, 13, 14, 16, 20, 24, 32],\n\n  shadows: {\n    // this part is ugly, this can be improved.\n    // bonus: these are terrible names\n    active: `inset 0px -2px 0px ${colors.blues[300]}`,\n    underline: `inset 0px -2px 0px ${colors.grays[100] + '1a'}`,\n    fadeunder: `inset 0px 8px 8px 0px ${colors.grays[700] + 'cc'}`\n  }\n}\n\nexport default theme\n",
    //     },
    //     {
    //         id: 'rVkv2',
    //         name: 'styles.css',
    //         directory: 'GXOoy',
    //         type: 'file',
    //         code: "@import url('https://rsms.me/inter/inter.css');\n\nbody {\n  font-family: 'Inter', sans-serif;\n  font-size: 14px;\n\n  background-color: #151515;\n  color: white;\n  zoom: 1;\n  margin: 0;\n}\n",
    //     },
    //     {
    //         id: 'g6lk3',
    //         name: 'code.js',
    //         directory: 'zY62q',
    //         type: 'file',
    //         code: "import React from 'react'\nimport Highlight from 'react-highlight'\nimport { Element } from 'react-ui'\nimport './highlight.css'\n\nfunction Code({ selectedFile, ...props }) {\n  if (!selectedFile) return null\n\n  const code = selectedFile.code\n  let extension = selectedFile.name.split('.').pop()\n\n  return (\n    <Element\n      as=\"pre\"\n      css={{\n        width: 'calc(100% - 250px)',\n        margin: 0,\n        paddingY: 2,\n        paddingX: 3,\n        fontSize: 4,\n        height: '100vh',\n        overflow: 'scroll',\n        '> pre': { margin: 0 }\n      }}\n      {...props}\n    >\n      <Highlight className={extension}>{code}</Highlight>\n    </Element>\n  )\n}\n\nexport default Code\n",
    //     },
    //     {
    //         id: 'BXG52',
    //         name: 'highlight.css',
    //         directory: 'zY62q',
    //         type: 'file',
    //         code: "@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,400,500,600&display=swap');\n\ncode.hljs {\n  font-family: 'IBM Plex Mono', monospace;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #999999;\n}\n\n.hljs-variable,\n.hljs-template-variable,\n.hljs-tag,\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class,\n.hljs-regexp,\n.hljs-deletion {\n  color: #999;\n}\n\n.hljs-number,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-literal,\n.hljs-type,\n.hljs-params,\n.hljs-meta,\n.hljs-link {\n  color: #fbcc43;\n}\n\n.hljs-attribute {\n  color: #f69935;\n}\n\n.hljs-string,\n.hljs-symbol,\n.hljs-bullet,\n.hljs-addition {\n  color: #a8a5f3;\n}\n\n.hljs-title,\n.hljs-section {\n  color: #5bc266;\n}\n\n.hljs-keyword,\n.hljs-selector-tag {\n  color: #64d2ff;\n}\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  background: #151515;\n  color: #fff;\n  padding: 0.5em;\n  font-size: 0, 6875rem;\n  line-height: 1.75rem;\n  font-weight: 200;\n  font-family: 'IBM Plex Mono', monospace;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n",
    //     },
    //     {
    //         id: 'R6xvY',
    //         name: 'utils.js',
    //         directory: 'GXOoy',
    //         type: 'file',
    //         code: "import React from 'react'\n\nfunction useFilesFromSandbox(id, callback) {\n  React.useEffect(function() {\n    fetch('https://codesandbox.io/api/v1/sandboxes/' + id)\n      .then(response => response.json())\n      .then(({ data }) => {\n        const files = [...data.modules, ...data.directories]\n\n        const prettyFiles = files.map(file => {\n          return {\n            id: file.shortid,\n            name: file.title,\n            directory: file.directory_shortid,\n            type: file.code ? 'file' : 'directory',\n            code: file.code\n          }\n        })\n\n        callback(prettyFiles)\n      })\n  }, [])\n}\n\nexport { useFilesFromSandbox }\n",
    //     },
    //     {
    //         id: 'Y6lp0',
    //         name: 'icon.js',
    //         directory: 'A6k6p',
    //         type: 'file',
    //         code: 'import React from \'react\'\n\nexport const ClosedDirectory = props => (\n  <svg\n    width="32"\n    height="32"\n    viewBox="0 0 32 32"\n    xmlns="http://www.w3.org/2000/svg"\n    {...props}\n  >\n    <path\n      d="M15.6674 9.70666L15.8096 9.83333H16H26C26.2761 9.83333 26.5 10.0572 26.5 10.3333V25C26.5 25.2761 26.2761 25.5 26 25.5H6C5.72386 25.5 5.5 25.2761 5.5 25V8C5.5 7.72386 5.72386 7.5 6 7.5H13.0001C13.1228 7.5 13.2411 7.54508 13.3327 7.62667L15.6674 9.70666Z"\n      fill="#64D2FF"\n      stroke="#64D2FF"\n    />\n  </svg>\n)\n\nexport const OpenDirectory = props => (\n  <svg\n    width="32"\n    height="32"\n    viewBox="0 0 32 32"\n    xmlns="http://www.w3.org/2000/svg"\n    {...props}\n  >\n    <path\n      d="M15.6674 9.70666L15.8096 9.83333H16H26C26.2761 9.83333 26.5 10.0572 26.5 10.3333V25C26.5 25.2761 26.2761 25.5 26 25.5H6C5.72386 25.5 5.5 25.2761 5.5 25V8C5.5 7.72386 5.72386 7.5 6 7.5H13.0001C13.1228 7.5 13.2411 7.54508 13.3327 7.62667L15.6674 9.70666Z"\n      fill="transparent"\n      stroke="#64D2FF"\n    />\n  </svg>\n)\n\nexport const js = props => {\n  return (\n    <svg\n      width="24"\n      height="24"\n      viewBox="0 0 24 24"\n      xmlns="http://www.w3.org/2000/svg"\n      {...props}\n    >\n      <path\n        d="m3 3h18v18h-18v-18m4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7v5.74c0 .86-.35 1.08-.9 1.08-.58 0-.82-.4-1.09-.87l-1.38.83m5.98-.18c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8z"\n        fill="#ffca28"\n      />\n    </svg>\n  )\n}\n\nexport const css = props => {\n  return (\n    <svg\n      width="24"\n      height="24"\n      viewBox="0 0 24 24"\n      xmlns="http://www.w3.org/2000/svg"\n      {...props}\n    >\n      <path\n        d="m5 3l-.65 3.34h13.59l-.44 2.16h-13.58l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64h-3.34l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21 1.54-7.76h-16.94z"\n        fill="#42a5f5"\n      />\n    </svg>\n  )\n}\n\nexport const json = props => {\n  return (\n    <svg\n      width="24"\n      height="24"\n      viewBox="0 0 24 24"\n      xmlns="http://www.w3.org/2000/svg"\n      {...props}\n    >\n      <path\n        d="m5 3h2v2h-2v5a2 2 0 0 1 -2 2 2 2 0 0 1 2 2v5h2v2h-2c-1.07-.27-2-.9-2-2v-4a2 2 0 0 0 -2 -2h-1v-2h1a2 2 0 0 0 2 -2v-4a2 2 0 0 1 2 -2m14 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0 -2 2v4a2 2 0 0 1 -2 2h-2v-2h2v-5a2 2 0 0 1 2 -2 2 2 0 0 1 -2 -2v-5h-2v-2h2m-7 12a1 1 0 0 1 1 1 1 1 0 0 1 -1 1 1 1 0 0 1 -1 -1 1 1 0 0 1 1 -1m-4 0a1 1 0 0 1 1 1 1 1 0 0 1 -1 1 1 1 0 0 1 -1 -1 1 1 0 0 1 1 -1m8 0a1 1 0 0 1 1 1 1 1 0 0 1 -1 1 1 1 0 0 1 -1 -1 1 1 0 0 1 1 -1z"\n        fill="#fbc02d"\n      />\n    </svg>\n  )\n}\n\nexport const html = props => (\n  <svg\n    width="24"\n    height="24"\n    viewBox="0 0 24 24"\n    xmlns="http://www.w3.org/2000/svg"\n  >\n    <path\n      d="m12 17.56l4.07-1.13.55-6.1h-7.24l-.18-2.03h7.6l.2-1.99h-10l.56 6.01h6.89l-.23 2.58-2.22.6-2.22-.6-.14-1.66h-2l.29 3.19 4.07 1.13m-7.93-14.56h15.86l-1.43 16.2-6.5 1.8-6.5-1.8-1.43-16.2z"\n      fill="#e44d26"\n    />\n  </svg>\n)\n\nexport const File = props => (\n  <svg\n    width="32"\n    height="32"\n    viewBox="0 0 32 32"\n    fill="none"\n    xmlns="http://www.w3.org/2000/svg"\n    {...props}\n  >\n    <mask id="path-1-inside-1">\n      <path d="M16.5689 5H9C8.44772 5 8 5.44772 8 6V26C8 26.5523 8.44772 27 9 27H23C23.5523 27 24 26.5523 24 26V12.1587L16.5689 5ZM16 6L23 13H16V6Z" />\n    </mask>\n    <path\n      d="M16.5689 5H9C8.44772 5 8 5.44772 8 6V26C8 26.5523 8.44772 27 9 27H23C23.5523 27 24 26.5523 24 26V12.1587L16.5689 5ZM16 6L23 13H16V6Z"\n      fill="#eee"\n    />\n    <path\n      d="M16.0689 5V6.56889H17.0689V5H16.0689ZM22.1587 12.6587H24V11.6587H22.1587V12.6587ZM16.5689 5L17.2627 4.27982L16.9722 4H16.5689V5ZM24 12.1587H25V11.7335L24.6938 11.4385L24 12.1587ZM23 13V14H25.4142L23.7071 12.2929L23 13ZM16 6L16.7071 5.29289L15 3.58579V6H16ZM16 13H15V14H16V13ZM9 6H16.5689V4H9V6ZM9 6L9 6V4C7.89543 4 7 4.89543 7 6H9ZM9 26V6H7V26H9ZM9 26H7C7 27.1046 7.89543 28 9 28V26ZM23 26H9V28H23V26ZM23 26V28C24.1046 28 25 27.1046 25 26H23ZM23 12.1587V26H25V12.1587H23ZM15.8751 5.72018L23.3062 12.8789L24.6938 11.4385L17.2627 4.27982L15.8751 5.72018ZM23.7071 12.2929L16.7071 5.29289L15.2929 6.70711L22.2929 13.7071L23.7071 12.2929ZM16 14H23V12H16V14ZM15 6V13H17V6H15Z"\n      fill="#eee"\n      mask="url(#path-1-inside-1)"\n    />\n  </svg>\n)\n',
    //     },
    //     {
    //         id: 'zEOmq',
    //         name: 'file-tree.js',
    //         directory: 'A6k6p',
    //         type: 'file',
    //         code: "import React from 'react'\nimport { Element } from 'react-ui'\nimport * as Icons from './icon'\n\nfunction FileTree(props) {\n  return <SubTree allFiles={props.files} {...props} />\n}\n\nfunction SubTree({ files, allFiles, selectedFile, onSelect, ...props }) {\n  return (\n    <Element {...props}>\n      {files\n        .filter(child => isRootLevel(files, child))\n        .sort(sortingFunction)\n        .map(child => (\n          <React.Fragment key={child.id}>\n            {child.type === 'directory' ? (\n              <Directory\n                files={files}\n                allFiles={allFiles}\n                selectedFile={selectedFile}\n                onSelect={onSelect}\n                {...child}\n              />\n            ) : (\n              <File\n                selectedFile={selectedFile}\n                allFiles={allFiles}\n                onClick={_ => onSelect(child)}\n                {...child}\n              />\n            )}\n          </React.Fragment>\n        ))}\n    </Element>\n  )\n}\n\nfunction Directory(props) {\n  const children = props.allFiles.filter(file => file.directory === props.id)\n\n  const defaultOpen = isChildSelected({\n    allFiles: props.allFiles,\n    directory: props,\n    selectedFile: props.selectedFile\n  })\n\n  const [open, setOpen] = React.useState(defaultOpen)\n  const toggle = () => setOpen(!open)\n\n  return (\n    <>\n      <File\n        icon=\"ClosedDirectory\"\n        selectedFile={props.selectedFile}\n        allFiles={props.allFiles}\n        onClick={toggle}\n        {...props}\n      />\n      {open ? (\n        <SubTree\n          files={children}\n          allFiles={props.allFiles}\n          selectedFile={props.selectedFile}\n          onSelect={props.onSelect}\n        />\n      ) : null}\n    </>\n  )\n}\n\nfunction FileIcon({ name, extension }) {\n  const Icon = Icons[extension] || Icons[name]\n  return (\n    <Element\n      as=\"span\"\n      css={{\n        display: 'flex',\n        width: 32,\n        height: 32,\n        justifyContent: 'center',\n        alignItems: 'center'\n      }}\n    >\n      <Icon />\n    </Element>\n  )\n}\n\nfunction File(props) {\n  const isSelected = props.selectedFile && props.selectedFile.id === props.id\n  const depth = getDepth(props.allFiles, props)\n\n  return (\n    <Element\n      as=\"div\"\n      {...props}\n      css={{\n        display: 'flex',\n        alignItems: 'center',\n        paddingLeft: theme => theme.space[3] * (depth + 1),\n        backgroundColor: isSelected ? 'grays.500' : 'transparent',\n        ':hover': {\n          cursor: 'pointer',\n          backgroundColor: 'grays.500'\n        },\n        ...props.css\n      }}\n    >\n      <FileIcon\n        name={props.icon || 'File'}\n        extension={props.name.split('.').pop()}\n      />\n      <Element as=\"span\" css={{ marginLeft: 1 }}>\n        {props.name}\n      </Element>\n    </Element>\n  )\n}\n\nfunction sortingFunction(a, b) {\n  // directories come first, sorted alphabetically\n  // then files, also sorted alphabetically\n  let first\n\n  if (a.type === b.type) {\n    if (a.name < b.name) first = a\n    else first = b\n  } else if (a.type === 'directory') {\n    first = a\n  } else {\n    first = b\n  }\n\n  // js be weird\n  if (first === a) return -1\n  else return 1\n}\n\nfunction isRootLevel(files, file) {\n  // find out if parent directory is in sub-tree\n\n  const parentId = file.directory\n  if (!parentId) return true\n\n  const parent = files.find(file => file.id === parentId)\n  if (!parent) return true\n}\n\nfunction getDepth(allFiles, file) {\n  let depth = 0\n\n  let parent = getParentDirectory(allFiles, file)\n\n  while (parent) {\n    depth++\n    parent = getParentDirectory(allFiles, parent)\n  }\n\n  return depth\n}\n\nfunction isChildSelected({ allFiles, directory, selectedFile }) {\n  const filesInCurrentSubTree = getFilesInSubTree(allFiles, selectedFile)\n\n  return filesInCurrentSubTree.find(file => file.id === directory.id)\n}\n\nfunction getFilesInSubTree(allFiles, selectedFile) {\n  if (!selectedFile) return []\n  const currentModuleTree = [selectedFile]\n\n  let parentDirectory = getParentDirectory(allFiles, selectedFile)\n\n  while (parentDirectory) {\n    currentModuleTree.push(parentDirectory)\n    // get parent directory of the parent directory\n    parentDirectory = getParentDirectory(allFiles, parentDirectory)\n  }\n\n  return currentModuleTree\n}\n\nfunction getParentDirectory(allFiles, file) {\n  if (file.directory) {\n    return allFiles.find(parent => parent.id === file.directory)\n  }\n}\n\nexport default FileTree\n",
    //     },
    //     {
    //         id: 'BA1N',
    //         name: 'index.html',
    //         directory: 'rgkK4',
    //         type: 'file',
    //         code: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta\n      name="viewport"\n      content="width=device-width, initial-scale=1, shrink-to-fit=no"\n    />\n    <meta name="theme-color" content="#000000" />\n    <title>File Tree</title>\n    <!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />\n    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />\n    <!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n    <title>React App</title>\n  </head>\n\n  <body>\n    <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n    <div id="root"></div>\n    <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  </body>\n</html>\n',
    //     },
    //     {
    //         id: 'HyxFS8AOdH',
    //         name: 'settings.json',
    //         directory: 'HyFBLA_dr',
    //         type: 'file',
    //         code: '{\n}',
    //     },
    //     {
    //         id: 'xyR23',
    //         name: 'open-in-sandbox.js',
    //         directory: 'zY62q',
    //         type: 'file',
    //         code: "import React from 'react'\nimport { Element } from 'react-ui'\n\nfunction OpenInSandbox(props) {\n  return null\n  return (\n    <Element\n      as=\"a\"\n      href={'https://codesandbox.io/s/' + props.id}\n      css={{\n        position: 'absolute',\n        bottom: 20,\n        right: 20,\n        border: '1px solid',\n        borderColor: 'grays.200',\n        color: 'white',\n        backgroundColor: 'grays.700',\n        borderRadius: 3,\n        padding: 2,\n        textDecoration: 'none'\n      }}\n    >\n      Open Sandbox\n    </Element>\n  )\n}\n\nexport default OpenInSandbox\n",
    //     },
    //     { id: 'A6k6p', name: 'components', directory: 'GXOoy', type: 'directory' },
    //     { id: 'rgkK4', name: 'public', directory: null, type: 'directory' },
    //     { id: 'GXOoy', name: 'src', directory: null, type: 'directory' },
    //     { id: 'zY62q', name: 'editor', directory: 'GXOoy', type: 'directory' },
    //     { id: 'HyFBLA_dr', name: '.vscode', directory: null, type: 'directory' },
    // ];
    // const [activePath  , setActivePath ] = useState('/index.js')

    const addUsers = (newUser: socketCodeboxUser) => {
        !users.find(
            (singleUser) =>
                singleUser.userId === newUser.userId &&
                singleUser.username === newUser.username,
        ) && setUsers((prev) => [...prev, newUser]);
    };

    const addChats = (newChat: chatType) => {
        chats.findIndex((chat) => chat.messageId === newChat.messageId) ===
            -1 && setChats((prev) => [...prev, newChat]);
    };

    useEffect(() => {
        const initalize = () => {
            addUsers(user);

            socketEmit(codeboxId, user);

            socketAddUser({
                addUsers,
                setUsers,
                currentUserId: user.userId,
            });

            socketRemoveUser({
                setUsers,
            });

            socketChat({
                setChats,
                addChats,
            });

            socketCode({
                setMonacoCode,
            });
        };

        initalize();

        return () => {
            socket.emit(ACTIONS_CODE_LEAVE, { codeboxId });
            socket.off(ACTIONS_ADD_CODE_USER);
            socket.off(ACTIONS_REMOVE_CODE_USER);
            socket.off(ACTIONS_CODE_CHAT);
            socket.off(ACTIONS_SEND_CODE_SERVER_CODE);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        users,
        chats,
        monacoEditorCode,
        setMonacoCode,
    };
};

export default useSocketCodebox;