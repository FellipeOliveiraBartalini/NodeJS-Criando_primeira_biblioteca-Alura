import chalk from "chalk";
import fs from 'fs';
import getFile from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function imprimeLista(valida, resultado, arquivo = null) {

    if (valida) {
        console.log(
            '\n',
            arquivo ? chalk.black.bgGreen('Arquivo: ' + arquivo) : '',
            '\n',
            chalk.yellow('Lista validada:'),
            await listaValidada(resultado)
        );    
    } else {
        console.log(
            '\n',
            arquivo ? chalk.black.bgGreen('Arquivo: ' + arquivo) : '',
            '\n',
            chalk.yellow('Lista de Links:'),
            resultado
        );
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

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
        imprimeLista(valida, resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.map(async arquivo => imprimeLista(valida, await getFile(`${caminho}/${arquivo}`), arquivo))
    }
}

processaTexto(caminho);
