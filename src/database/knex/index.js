/*
essa pasta knex/index.js é para fazer a configuração e conexão do knexfile.js com meu banco de dados
1 - migrations é uma ferramenta para automatizar tabelas em minha API, meu projeto.

*/


const config = require("../../../knexfile"); //importando/require minhas configurações feitas no knexfile.js
const knex = require("knex"); // importando/require o knex de despejando em minha const knex


const connection = knex(config.development) //criando minha conexão(const connection) knex com as configurações de conexão: (dentro do meu config eu tenho as configurações de desenvolvimento/development ) 

module.exports = connection; //exportando minha conexão(const connection) para ser utilizada em outros lugares