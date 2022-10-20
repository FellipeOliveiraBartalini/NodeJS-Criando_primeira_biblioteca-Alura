import fs from 'fs';
import chalk from 'chalk';

function catchError(error) {
    throw new Error(chalk.red(error));
}

function getFile(filePath) {
    const enconding = 'utf-8';
    fs.promises
        .readFile(filePath, enconding)
        .then(data => {
            console.log(chalk.green(data));
        })
        .catch(error => {
        	catchError(error);
        })
}

// function getFile(filePath) {
//     const enconding = 'utf-8';
//     fs.readFile(
//         filePath,
//         enconding,
//         (error, texto) => { 
//             error ? catchError(error) : console.log(chalk.green(texto));
//         }
//     );
// }

getFile('./arquivos/texto.md');
