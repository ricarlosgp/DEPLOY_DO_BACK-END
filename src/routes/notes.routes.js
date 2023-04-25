/* 
POST é um método de requisição para criação. Ex: quero criar um produto.
response = resposta
send = enviar
respond.send = respondendo e enviando ou respondendo com resposta
require - maneira que o Node.js criou para importar e exportar módulos dentro de uma aplicação.
require usa module.exports ( que é a sintaxe "antiga" para exportar um módulo, e que pode ser o que quisermos, um objeto, uma string, etc)
require("express") significa que estou importando de dentro do express
const { Router } = require("express") - importando com o require de dentro do express o Router

middleware – são funções/function que têm acesso ao objeto de solicitação ou seja, o middleware consegue acessar qual é o conteúdo da requisição/request, consegue acessar o objeto de resposta/response ou seja, o middleware pode executar e devolver uma resposta se for o caso. E a próxima função que o middleware tem que seguir com o ciclo da solicitação se assim for necessário. Ex: Vamos supor que eu só posso cadastrar um produto ou new product se o usuário tiver permissão administrativo então eu posso criar um middleware para verificar aí o middleware vai barrar ou não o usuário.
*/
const { Router } = require("express"); /* importando o Router de dentro do express.
declarei uma variável const {Router}. Esse Router como está entre chaves {} significa que ela vai ser importado do require("express") da pasta express que está em node_modules */
const NotesController = require("../controllers/NotesController"); /* importando com require e (saindo da pasta routes(../) acessando a pasta controllers e acessando tudo do arquivo UsersController.js) */

const ensureAuthenticated = require("../middlewares/ensureAuthenticated"); //estou importando o Middleware de autenticação 

const notesRoutes = Router( ); /* inicializando o Router( ). Declarei uma constate usersRoutes que receberá Router inicializando ele () */
const notesController = new NotesController(); //nova/new instância UsersController() para poder pegar o usersController (const usersController)

/* Aqui estou configurando minha aplicação/app/API ou nodes para receber minhas requisições vinda do insomnia e essas são as minhas rotas de usuários do tipo .post ou criação usersRoutes.post. A rota está recebendo a requisição e a resposta e vai repassar para o controllers equivalente e precisamos levar essa requisição para o controllers   */

notesRoutes.use(ensureAuthenticated); //estou passando antes das rotas abaixo o Middleware de autenticação pois ao invés de colocar o Middleware de autenticação que é o ensureAuthenticated rota por rota eu apenas apliquei o ensureAuthenticated para todas as notesRoutes ou seja, todas essas rotas dependem desse token. Agora é testar cada notesRoutes no insomnia o POST,GET,DELETE      

notesRoutes.post("/", notesController.create); //essa rota têm um endereço raiz "/" ou seja, quando for acessado dentro do index.js temos o "/users" e quando acessarmos o "/users" iremos direcionar através do usersRouter("/users", usersRouter) para o arquivo específico da rota do usuário ou users.routes.js e dentro do users.routes.js temos que quando batido na raiz do nosso user acima "/", (usersRoutes.post("/", myMiddleware, usersController.create)) vai ser chamado o create que está dentro do usersController só que antes de chamar o create temos o middleware que vai conseguir recuperar qual é a request que foi enviada para função de criar usuário ou usersController.create, o response/resposta e o next que é a função que vai dizer para que o nosso middleware posa então continuar com o fluxo.   

notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);
notesRoutes.get("/", notesController.index);





module.exports = notesRoutes; /* Através do module.exports estou exportando o usersRoutes para quem quiser utilizar.  */


/* MIDDLEWARE 
/* criando uma função middleware (function myMiddleware) e com ele eu consigo acessar (uma requisição/request, uma resposta/response e o destino/next da requisição que é interceptada pelo middleware). Estou acessando com o middleware a requisição, resposta e devolver essa resposta para que solicitou essa requisição e o next que é para chamar o destino, para onde ele deverá seguir o fluxo.  

function myMiddleware(request, response, next){
    console.log("Você passou pelo Middleware!") //quem vai exibir essa mensagem é o Middleware

    next(); //aqui estou chamando a próxima função do middleware a ser executada que no caso é a função de criar o próximo usuário ou usersController.create que está logo abaixo (usersRoutes.post("/", myMiddleware, usersController.create);
}


*/




