/*
npx knex migrate:make createLinks para criar a migrations createLinks.js
obs: como já havia criado a migrations Notes.js é só copiar e colar para a migrations Tags e fazer as substituições. 

1 - uma migrations sempre haverá um up e down
2 - up - processo de criar/create a tabela
3 - down - processo de deletar/drop a tabela
*/

exports.up = knex => knex.schema.createTable("links", table => {//criando uma tabela(createTable) chamada de tags e irei colocar os campos dessa tabela através da arrow function table =>
    table.increments("id"); //dentro da minha table eu tenho um campo do tipo increments chamado id
    table.text("url").notNullable(); //dentro de minha tabela criei um campo do tipo text chamado de url e não permite que seja um campo nulo/notNullable()

    table.timestamp("created_at").default(knex.fn.now()); //criei um campo do tipo timestamp chamado de created_at e por padrão/default vai gerar esse timestamp pelo knex através da função/fn.now(). Ele vai ser útil pois eu poderei filtrar por data de criação. 
    
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//criei um campo do tipo inteiro/integer chamado note_id que fará uma referência/references ao id que existe  dentro da tabela notes(.inTable(notes) ou seja, não vai dar para eu criar uma nota se não existir um usuário e se eu deletar a nota/onDelete que esse link está vinculada então automaticamente ele vai deletar a tag em cascata/onDelete("CASCADE"). Ex: eu tenho uma nota e tenho algumas tags vinculadas a essa nota e se eu deletar esse link não faz sentido eu ter essas tags.  
     
});

exports.down = knex => knex.schema.dropTable("links");

//após feito o processo de criação da tabela pelo knex, precisamos carregar essa tabela no banco de dados beekeeper então  para eu pegar essa minha migration e executar lá dentro do banco beekeeper eu preciso executar no terminal: npx knex migrate:latest 

//npm run migrate - ao invés de ficar rodando esse comando npx knex migrate:latest  toda vez que eu criar uma tabela via migration, cria-se um script("migrate": "knex migrate:latest") para automatizar esse comando lá no package.json ai quando eu quiser rodar eu executo apenas npm run migrate