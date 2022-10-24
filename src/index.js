import fs from 'fs';
import chalk from 'chalk';

function catchError(error) {
    throw new Error(chalk.red(error));
}

async function getFile(filePath) {
    try {
        const enconding = 'utf-8';
        const text = await fs.promises.readFile(filePath, enconding);
        return getLinks(text);

    } catch(error) {
        catchError(error);
    } finally {
        console.log(chalk.yellow("Operação concluída!"));
    }
}

function getLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados.length > 0 ? resultados : ["Não foram encontrados Links no arquivo!"];
}

export default getFile;
