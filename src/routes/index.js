/* esse index.js criado dentro do rotes terá a missão de reunir todas as rotas de minha aplicação 
module.exports = usado para exportação
require = usado para importação

*/

const { Router } = require("express"); //importando com o require de dentro do express o Router

const usersRouter = require("./users.routes"); //importando com o require todo o grupo de rotas do usuário ou users.routes e colocando na variável const usersRouter
const notesRouter = require("./notes.routes");
const tagsRoutes = require("./tags.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router( ); //criei routes igual a Router
routes.use("/users", usersRouter); /* /users é a rota que eu quero e ao invés de colocar o request e response eu coloco o usersRouter ou seja toda vez que alguém for acessar meu /users vai ser redirecionado para o usersRouter que é o grupo de rotas do usuário     */
routes.use("/sessions", sessionsRoutes);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRoutes);



module.exports = routes; //exportando o routes que é a const routes que recebeu todas as rotas de nossa aplicação ao colocar routes.use("/users", usersRouter)

