/* 
OBS: dentro do arquivo database.db não conseguimos inserir comentários, não conseguiremos ver e nem ter acesso aos arquivos pelo VSC e para visualizarmos e termos acesso a esse arquivo, precisaremos de um SGBD
0 - precisamos instalar o sqlite3 e sqlite pelo terminal com o comando: npm install sqlite3 sqlite --save (obs:colocamos - - save pois é uma dependência de produção)
1-index.js quando eu quiser me comunicar com o sqlite eu chamo através do index.js
2 - filename é onde o meu arquivo ficará salvo
3 - path é uma biblioteca própria do nodes e que não precisa instalar com o npm install e esse path vai resolver os endereço das pastas ou arquivos de acordo com o meu sistema operacional. Ex: essa é a minha forma de navegação de um diretório no windows: "../../database" e se eu não importar o path e abrir minha API em outro sistema operacional vai dar erro ao localizar meus diretórios. Então ao invés de colocar "../../database" coloca-se: path.resolve(__dirname, ".." , "database.db") 
4 - path.resolve(__dirname, ".." , "database.db") - resolva/resolve para mim pegando de forma automática de onde estou(__dirname) dentro do meu projeto(e nesse caso estou no arquivo index.js na pasta sqlite dentro da pasta database que está dentro de src), irei voltar uma pasta para trás com ".." (nesse caso sai da pasta sqlite para database), e irei criar um arquivo "database.db" dentro da pasta database. 
*/

const sqlite3 = require("sqlite3"); //importando com o require o sqlite3 e despejando dentro de minha variável const sqlite3
const sqlite = require("sqlite");//importando com o require o sqlite e despejando dentro de minha variável const sqlite
const path = require("path"); //importando com o require o path e despejando dentro de minha variável const path.

/* criando uma função do tipo assíncrona/async pois como irei trabalhar com conexão de banco de dados e no momento que minha aplicação iniciar se o arquivo de banco de dados/database.db não existir então ele vai criar o arquivo de banco de dados automaticamente na pasta sqlite e se ele existir ele vai se conectar. Obs: não vai criar o conteúdo apenas o arquivo de bancos de dados para manipular ele, abrir e ver o conteúdo e inserir*/
async function sqliteConnection(){ //declarando uma function chamada de sqliteConnection e sem argumento ou anônima() e será assíncrona por isso o async está antes da declaração. Essa função terá em seu escopo{} a criação de uma variável const chamada database que recebe o await/aguando sqlite.open (por isso foi colocado o async) e que vai abrir/open uma conexão e nesse open passarei o argumento/parâmetro() um objeto{} e dentro desse objeto{} irei configurar minha conexão  que são: 1 - onde quero salvar o arquivo de meu banco de dados? repondo colocando a propriedade filename. 2 - preciso informar o driver de conexão que irei utilizar e sua versão que é o sqlite3.Database 3 - fazer o retorno/return do database

    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database 
    });
    return database; 
}

module.exports = sqliteConnection; //exportando através do module.exports o sqliteConnection