
const { Router } = require("express"); //importando\require do express o {Router}
const SessionsController = require("../controllers/SessionsController");//importando\require do diretório ../controllers/SessionsController.js a minha class SessionsController e despejando na minha const SessionsController
const sessionsController = new SessionsController(); //como o SessionsController é uma classe(class SessionsController) então preciso instanciar ele colocando um new SessionsController() e ao instanciar estamos colocando essa classe SessionsController na memória e transferindo, armazenando para const sessionsController   
const sessionsRoutes = Router(); //declarei uma const sessionsRoutes que vai ser igual ao nosso Router (const {Router}) criado acima.
sessionsRoutes.post("/", sessionsController.create); //pegando o sessionsRoutes(const sessionsRoutes) que iremos acessar através de um .post no diretório raiz "/", e o sessionsController queremos acessar o de create (sessionsController.create)

module.exports = sessionsRoutes;
//para usar o sessionsRoutes vá ao index.js da pasta routes e faça a importação com os comandos: const sessionsRoutes = require("./sessions.routes"); routes.use("/sessions", sessionsRoutes);
