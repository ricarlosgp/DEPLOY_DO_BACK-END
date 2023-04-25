/* após executar o comando npx knex init, foi gerado na raiz do projeto o arquivo knexfile.js. Apague os comentários e deixe apenas o module.exports
0 - __dirname significa partindo do diretório de onde estou

0 - path é uma biblioteca própria do nodes e que não precisa instalar com o npm install e esse path vai resolver os endereço das pastas ou arquivos de acordo com o meu sistema operacional. Ex: essa é a minha forma de navegação de um diretório no windows: "../../database" e se eu não importar o path e ao abrir minha API em outro sistema operacional(linux, android, apple etc..) vai dar erro ao localizar meus diretórios. Então ao invés de colocar "../../database" coloca-se: path.resolve(__dirname, ".." , "database.db") 

1- path.resolve(__dirname, "src", "database", "database.db") - o path.resolve é justamente para que outros sistemas operacionais tenham acesso ao diretório ou arquivo 
2 - npx knex migrate:make createNotes - após configurar a migration tanto no knexfile quanto na pasta knex eu irei criar minha tabela chamada de Notes automaticamente pela migration. Observe que dentro da pasta migrations foi criado o arquivo createNotes.js  

3 - afterCreate é uma propriedade que significa após criar

*/

const path = require("path") //importando/require o path e despejando em minha const path

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db") //resolva esse endereço/path.resolve independente so sistema operacional ou seja, localize e abra esse diretório em qualquer operacional sendo utilizado "src", "database", "database.db
    },
    pool:{//é uma funcionalidade que será executado no momento em que estabelecer com nosso banco de dados.  
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
      //logo após criar/afterCreate eu quero executar uma função para recuperar a minha  (conexão/conn, e minha função de callback/cb) e na arrow function irei pegar a conexão/conn e irei rodar/run um comando para habilitar a funcionalidade/PRAGMA foreign_keys = ON Ex: quando eu deletar uma nota então tudo o que tiver em casata/cascade será deletado as tags, e coloco a função de callback/cb     
    },


    migrations: {//mostrando ao knexfile em que lugar/directory ele vai armazenar essas informações que vai ser na pasta migrations e irei utilizar o path.resolve para que outros sistemas operacionais consigam localizar esse diretório  
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },

    useNullAsDefault: true //propriedade padrão para se trabalhar com o cliente: sqlite
  }
};
//até aqui nosso arquivo de configuração está pronto agora precisamos usar essas configurações para que o knex possa se comunicar com o banco de dados e para isso, criaremos uma pasta knex na pasta database e um arquivo index.js para importar essas configurações
//
