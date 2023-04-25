/*
1 - uma migrations sempre haverá um up e down
2 - up - processo de criar/create a tabela
3 - down - processo de deletar/drop a tabela
*/

exports.up = knex => knex.schema.createTable("notes", table => {//criando uma tabela(createTable) chamada de notes e irei colocar os campos dessa tabela através da arrow function table =>
    table.increments("id"); //dentro da minha table eu tenho um campo do tipo increments chamado id
    table.text("title"); //dentro de minha tabela criei um campo do tipo text chamado de title
    table.text("description");//dentro de minha tabela criei um campo do tipo text chamado de description
    table.integer("user_id").references("id").inTable("users");//criei um campo do tipo inteiro/integer chamado user_id que fará uma referência/references ao id que existe  dentro da tabela usuários(.inTable(users). Ou seja, não vai dar para eu criar uma nota se não existir um usuário

    table.timestamp("created_at").default(knex.fn.now()); //criei um campo do tipo timestamp chamado de created_at e por padrão/default vai gerar esse timestamp pelo knex através da função/fn.now(). 
    
    table.timestamp("updated_at").default(knex.fn.now()); //criei um campo do tipo timestamp chamado de updated_at e por padrão/default vai gerar esse timestamp pelo knex através da função/fn.now().
  
});

exports.down = knex => knex.schema.dropTable("notes");

//após feito o processo de criação da tabela pelo knex, precisamos carregar essa tabela no banco de dados beekeeper então  para eu pegar essa minha migration e executar lá dentro do banco beekeeper eu preciso executar no terminal: npx knex migrate:latest 
//ao invés de ficar rodando esse comando npx knex migrate:latest  toda vez que eu criar uma tabela via migration, cria-se um script("migrate": "knex migrate:latest") para automatizar esse comando lá no package.json ai quando eu quiser rodar eu executo apenas npm run migrate