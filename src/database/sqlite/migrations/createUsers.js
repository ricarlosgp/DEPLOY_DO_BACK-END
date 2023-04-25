/* imagina utilizar minha aplicação em outro servidor, em outro lugar e toda vez terei que criar a tabela novamente, guardar o código e ficar executando manualmente no SGDB beekeeper. Para evitar isso utilizamos o migrations e por isso foi criado a pasta com o nome migrations e o arquivo createUsers.
1 - migrations é uma ferramenta para automatizar tabelas de meu projeto a migrations irá criar meu arquivo database.db com as tabelas existentes com as colunas, linas e valores exceto os conteúdos. então se eu apagar meu arquivo database.db ela irá recriar 
2 - CREATE TABLE IF NOT EXISTS users - criar tabela se não existir a tabela users  

*/

//declarei uma varável const createUsers que recebe meu comando para criar minha tabela
const createUsers = ` 
    CREATE TABLE IF NOT EXISTS users ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `;

  module.exports = createUsers; //exportando com o module.exports minha variável const createUsers e ao ser importada deverá receber o mesmo nome createUsers