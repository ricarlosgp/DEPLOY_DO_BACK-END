const knex = require("../database/knex"); // importando/require o arquivo index.js localizado no diretório database/knex e despejando em minha const knex

class NotesController{
    async create(request, response){
        const { title, description, tags, links } = request.body;//estou acessando do corpo/body da requisição/request e pegando as informações: title, description, tags, links. 

        const user_id = request.user.id; 

        const [note_id] = await knex("notes").insert({//cadastrando os objetos que eu quero inserir utilizando o knex
            title,
            description,
            user_id
        });

        const linksInsert = links.map(link => {//irei pegar a const linksInsert que vai/= percorrer/map cada link que eu tenho e retornar/return o note_id e url:link
            return {//aqui irei criar um objeto novo mudando de link para url
                note_id,//código da nota que o link está vinculado 
                url: link//mudando de link para url
            }
        });

        await knex("links").insert(linksInsert);

        const tagsInsert = tags.map(name => {//irei pegar a const tagsInsert que vai/= percorrer/map cada tags pegando apenas o name dela e vai retornar/return o note_id e url:link
            return {//aqui irei retornar da tag
                note_id, 
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert); //irei inserir na tabela tags o tagsInsert 

        return response.json();

    }

    async show(request, response){
        const { id } = request.params;

        const note = await knex("notes").where({ id }).first();
        const tags = await knex("tags").where({ note_id: id}).orderBy("name");
        const links = await knex("links").where({ note_id: id}). orderBy("created_at");

        return response.json({
            ...note,
            tags,
            links        
        });

    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("notes").where({ id }).delete();

        return response.json();

    }

    async index(request, response){
        const { title, tags } = request.query;

        const user_id = request.user.id;

        let notes;

        if(tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());

            notes = await knex("tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.user_id",
                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)
                .whereIn("name", filterTags)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .groupBy("notes.id")
                .orderBy("notes.title")
        } else {

        notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
        }

        const userTags = await knex("tags").where({user_id});
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        })
        return response.json(notesWithTags);
    }
}

module.exports = NotesController;