import chalk from "chalk";
import fetch from "node-fetch";

function extraiLinks(listaLinks) {
    return listaLinks.map(item => Object.values(item).join());
}

async function checkStatus(arrUrl) {
    const arrStatus = await Promise.all(
        arrUrl.map(async url => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch(error) {
                return errorHandler(error);
            }
        })
    );
    return arrStatus;
}

function errorHandler(error) {
    if (error.code === 'ENOTFOUND') {
        return '404 - Link não encontrado';
      } else {
        return 'ocorreu algum erro';
      }
}

export default async function listaValidada(listaLinks) {
    const links = extraiLinks(listaLinks);
    const status = await checkStatus(links);
    return listaLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }));
}
