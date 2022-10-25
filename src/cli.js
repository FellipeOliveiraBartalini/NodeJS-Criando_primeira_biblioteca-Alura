import chalk from "chalk";
import fs from 'fs';
import getFile from "./index.js";

const caminho = process.argv;

function imprimeLista(resultado) {
    console.log(chalk.yellow('Lista de Links:'), resultado);
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];

    try {
        fs.lstatSync(caminho);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(chalk.red("404 - Arquivo ou diretório não existe!"));
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await getFile(caminho);
        console.log(chalk.yellow('lista de links:'), (resultado));
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.map(async arquivo => imprimeLista(await getFile(`${caminho}/${arquivo}`)))
    }
}

processaTexto(caminho);
