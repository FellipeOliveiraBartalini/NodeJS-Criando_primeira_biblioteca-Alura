import fs from 'fs';
import chalk from 'chalk';

function catchError(error) {
    throw new Error(chalk.red(error));
}

async function getFile(filePath) {
    try {
        const enconding = 'utf-8';
        const text = await fs.promises.readFile(filePath, enconding);
        console.log(chalk.green(text));
    } catch(error) {
        catchError(error);
    } finally {
        console.log(chalk.yellow("Operação concluída!"));
    }

}

getFile('./arquivos/texto.md');
