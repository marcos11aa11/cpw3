const fs = require('fs/promises');
async function converterJsonParaTxt() {
  try {
    const textoBruto = await fs.readFile('alunos_convertidos.json', 'utf-8');
    //Converte a string em um Array de Objetos JavaScript (JSON.parse)
    const contatosObjeto = JSON.parse(textoBruto);
    //Mapeia cada objeto transformando em linha de texto separada por vírgula
    const linhas = contatosObjeto.map(contato => {
      return `${contato.nome}, ${contato.email}, ${contato.telefone}`;
    });

    //Junta todas as linhas separando por quebra de linha (\n)
    const textoTxt = linhas.join('\n');

    //Salva o resultado no arquivo .txt
    await fs.writeFile('dados_brutos.txt', textoTxt);
    console.log("Sucesso! Arquivo 'dados_brutos.txt' criado com sucesso.");

  } catch (erro) {
    console.error("Erro na conversão:", erro);
  }
}

converterJsonParaTxt();