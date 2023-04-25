/*
1 - estou em index.js e para chegar até o index.js na raiz da pasta sqlite eu faço('../../sqlite') ou seja: volte para pasta migration ../ depois volte para pasta sqlite ../ e não precisa especificar o index.js pois por padrão vai sempre em busca do index.js
2 - para voltar pastas eu uso ../ com dois pontos
3 - para voltar um arquivo eu uso ./ um ponto
4 - const sqliteConnection = require('../../sqlite'); importando minha conexão sqliteConnection de dentro da pasta sqlite
5 - função anônima - quando não consta parâmetro ou argumento no parêntese ()
6 - .then() - O método then() retorna uma Promise. Possui dois argumentos, ambos são "call back functions", sendo uma para o sucesso e outra para o fracasso da promessa.
7 - .catch - O método catch() retorna uma Promise e lida apenas com casos rejeitados.
*/


const sqliteConnection = require('../../sqlite'); //importando através do require o meu index.js localizado na raiz da pasta sqlite e despejando em minha variável declarada const sqliteConnection ao qual foi exportada pelo module.exports = sqliteConnection de dentro do sqlite/index.js;

const createUsers = require('./createUsers'); //importando através do require o arquivo createUsers.js (que foi exportado pelo module.exports = createUsers em sqlite/migrations/createUsers.js) e despejando em minha variável const createUsers;

async function migrationsRun(){//declarei uma função anônima com nome migrationsRun que vair ter em seu objeto ou escopo {} uma variável que receberá um array[]
    const schemas = [//esse schemas irá se referir as tabelas que meu banco vai ter ou seja minhas migrations e como só tenho uma tabela ou migrations que é a createUsers e caso eu tenha mais de uma tabela é só colocar no array e separar por vírgula 
        createUsers
    ].join(''); //.join('') estou juntando todas as migrations e usando como parâmetro para juntar nada ''

    sqliteConnection() //chamando meu sqliteConnection que é a função async function sqliteConnection criada no index.js dentro de migrations 
        .then(db => db.exec(schemas)) //utilizando uma promise.then para executar os meus schemas que são as minhas migrations declarada em const schemas[]
        .catch(error => console.error(error)); //caso apresente algum erro irei dar um console do error
}

module.exports = migrationsRun;//exportando com o module.exports minha async function migrationsRun. Ao ser importada deverá receber o mesmo nome da exportação ou seja: migrationsRun