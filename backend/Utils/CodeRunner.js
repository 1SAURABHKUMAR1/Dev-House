const fs = require('fs');
const path = require('path');
const { PythonShell } = require('python-shell');
const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('./CustomError');
const uuid = require('uuid').v4;

const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const executePythonCode = async (code, input) => {
    const uniq = uuid();
    const fileName = `${uniq}.py`;
    const filePath = path.join(dirCodes, fileName);

    return new Promise(async (resolve) => {
        await fs.writeFileSync(filePath, code);

        console.log(gcc);

        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            args: input
                ? input
                      .split('\n')
                      .map((num) => (Number(num) ? Number(num) : num))
                : [],
        };

        PythonShell.run(filePath, options, (error, result) => {
            if (error) {
                resolve(error.message);
            }

            resolve(result);
        });
    });
};

exports.executePythonCode = executePythonCode;
