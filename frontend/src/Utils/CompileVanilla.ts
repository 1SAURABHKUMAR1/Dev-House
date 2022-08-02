const compileVanilla = ({
    html,
    css,
    javascript,
}: {
    html: string;
    css: string;
    javascript: string;
}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>Dev - House</title>
        <style>${css}</style>
        </head>
        <body>
        <div id='root'></div>
        ${html}
        <script>
        window.onerror = function (err) {
          window.parent.postMessage(
            { source: "iframe", type: "iframe_error", message: err },
            "*"
          );
        };
  
        window.onunhandledrejection = function (err) {
          window.parent.postMessage(
            { source: "iframe", type: "iframe_error", message: err.reason },
            "*"
          );
        };
  
        window.onmessage = function (event) {
          try {
            eval(event.data);
          } catch (error) {
            throw error;
          }
        };
        </script>
        <script>
        ${javascript}
        </script>  
      </body>
    </html>
    `;
};

export default compileVanilla;
