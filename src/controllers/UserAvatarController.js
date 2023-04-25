const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
    async update(request, response) {//criando a função assíncrona de update pegando o request e o response 
        const user_id = request.user.id;//da requisição eu vou pegar o id do usuário que quer atualizar a imagem dele, o avatar pegando de request.user.id 
        const avatarFilename = request.file.filename;//irei pegar o nome do arquivo que o usuário fez o upload e irei chamar de avatarFilename que irei pegar de request.file.filename 
        
        const diskStorage = new DiskStorage();

        //agora eu preciso buscar os dados do usuário para então atualizar de fato o avatar do usuário
        const user = await knex("users") //eu quero/await a tabela de usuário/users
        .where({ id: user_id }).first(); //e eu quero buscar onde/where o id do usuário seja igual a user_id e como eu quero pegar o primeiro então eu passo um first

        if (!user) {//se esse usuário não existe eu irei exibir uma mensagem de erro passando um 401 de não autorizado 
            throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
        }
        //se passou do if acima então:
        if (user.avatar){// irei verificar se dentro do usuário existe um avatar 
            await diskStorage.deleteFile(user.avatar);//se exite um avatar eu irei pegar a foto que já existe e deletar para poder colocar a nova foto 
        }
        const filename = await diskStorage.saveFile(avatarFilename); //se não existir uma imagem anterior irei pegar a nova foto com const filename pegando do await diskStorage usando a função saveFile passando o novo avatar(avatarFilename) 
        user.avatar = filename;  //irei pegar o user.avatar e colocar a nova imagem ou filename dentro dele

        await knex("users").update(user).where({ id: user_id });

        return response.json(user);
      
    }
}

module.exports = UserAvatarController;

//para fazer o teste precisa ir em routes/users.routes.js e importar as rotas de avatar:
//const UserAvatarController = require("../controllers/UserAvatarController");
//const ensureAuthenticated = require("../middlewares/ensureAuthenticated"); 

