/* 
1 - node_modules – pasta que armazena todos os módulos e bibliotecas que a nossa aplicação está utilizando. A pasta node_modules são módulos que precisamos para nossa aplicação e nela contêm várias bibliotecas que foram adicionadas após instalação do EXPRESS. 
2 - src é a minha pasta raiz ou ./
3 - server.js – arquivo responsável por inicializar a aplicação. Quando uma requisição chega nele, vai passar pelas nossas rotas para que seja identificada qual é o controllers que vai ser executado, o que que o usuário está pedindo e baseado na rota, no caminho vai ser entregue para um determinado controllers que vai executar essa requisição e depois ele devolve para rota/rotes e a rota sabe para quem deve devolver através do server.js para o usuário que fez a solicitação.      
4 - require - maneira que o Node.js criou para importar e exportar módulos dentro de uma aplicação. O require usa module.exports ( que é a sintaxe "antiga" para exportar um módulo, e que pode ser o que quisermos, um objeto, uma string, etc)
5 - app - é minha aplicação API que é o NODE.JS portanto aap é o mesmo que node
6 - const app - declarei uma variável constante para mina app ou node.js
7 - express - é um framework utilizado para lidar com requisições HTTP feita pelo cliente através da minha aplicação/app/API ou node.js
7 - express() - significa que estou inicializando o express desde que haja a abertura e fechamento do parêntese no final.
8 - listen - ouvir, prestar atenção, observar ...
9 - require("express") significa que estou importando de dentro do express
10 - controllers é a camada responsável por processar as requisições 
11 - ./ significa que estou indo para pasta raiz que é p src
12 - ".." significa que estou voltando uma pasta para trás

obs: após feito todo processo do migrations, exclua o arquivo database.db, desconecte-se do SGBD beekeeper e se eu vier a salvar meu vsc automaticamente será criado novamente o meu arquivo database.db com todas as tabelas(colunas, linhas e valores ) exceto os conteúdos  
*/

require("express-async-errors"); //importando através do require 
require("dotenv/config");

const migrationsRun = require("./database/sqlite/migrations"); // importando através do require meu index.js localizado na pasta sqlite que fica dentro da pasta database, da pasta sqlite e da pasta migrations despejando esse arquivo em minha variável const migrationsRun   
const AppError = require("./utils/AppError") //importando o AppError de ./utils/AppError e despejando na variável const AppError
const uploadConfig = require("./configs/upload");

const cors = require("cors");

const express = require("express"); /* importando com o require tudo do express e colocando na variável const express */
const routes = require("./routes") /* importando com o require da pasta routes o index.js e colocando na variável const usersRoutes. Como não especifiquei o arquivo a ser carregado após o ./routes/ então por padrão ele vai carregar o index.js ("./routes/index.js")*/

migrationsRun(); //executando minha async function migrationsRun da pasta migrations e do arquivo index.js
const app = express(); /* Declarei uma variável constante para minha aplicação API ou node.js chamada de  const app que recebe a inicialização do express(); após o require("express") eu preciso inicializar o express e para inicializar o express() eu preciso abrir e fechar o parêntese após o express. O express() vai inicializar o require("express") ou seja, toda funcionalidade da pasta express que está em node_modules  */
app.use(cors());

app.use(express.json()); /* usando/use em minha aplicação/app/API ou nodes requisições do tipo JSON que foi configurado no sistema Insomnia no corpo de minha requisição ou request.body configurada no users.routes.js. Observe que além da requisição o express.json() está inicializando  */

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)); 

app.use(routes); /* usando/use em minha aplicação/app/API ou node.js a rota routes.
Esse routes foi criado em ./routes/index.js/const routes = Router( ); */


//o error é para capturar o erro da requisição, request não precisamos de nenhuma informação dela aqui o response é para utilizar para devolver a resposta que no caso estamos verificando se o erro é por parte do cliente ou do servidor e devolve a resposta de acordo com o tipo de erro e o next é caso queira pedir para avançar uma próxima etapa e como se trata de erro não precisamos dele. E precisamos manter nessa ordem (error, request, response, next), nessa sequencia mesmo que não for utilizado alguns     
app.use(( error, request, response, next ) => { //pegando o app.use e irei capturar o error, request, response e o next e irei utilizar uma arrow function para saber se o erro é do lado do cliente(AppError) ou servidor
    if(error instanceof AppError ) { //se o erro/error for da instancia/instanceof do tipo AppError no caso erro gerado pelo cliente faça o return. Ex: name é obrigatório e o cliente não colocou então vai ser erro por parte do cliente
        return response.status(error.statusCode).json({ //retorne/return no response.status colando error.statusCode.json passando objeto({}) com status de error e message como error.message 
            status: "error",
            message: error.message
        });   
    }
        console.error(error); //colocando um console.error em error para eu conseguir debugar o erro caso eu precise

        //se não for erro do lado do cliente, da instância AppError irei emitir um erro padrão do servidor:
        return response.status( 500 ).json({ //retorne/return em response.status o erro de 500.json que é o status code de erro do servidor e irei devolver um objeto({}) com status de erro e message padrão "Internal server error" 
            status: "error",
            message: "Internal server error",
        });
    
 
});

const PORT = process.env.SERVER_PORT || 3333; //3333; /*informando ao express a rota que ele vai atender as requisições */

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); /* observando/listen em minha aplicação/app/node.js ou API nesse endereço PORT, e quando meu app inicializar () ela vai executar uma função(Arrow Functions =>) que vai exibir(console.log) a mensagem interpolada `Server is running on Port no endereço ${PORT}` que é minha porta 3333 declarada.  

Obs: `` essa crase é chamada de interpolação e serve para misturar textos com números ou conteúdos de variável. 
Quando tiver ${ } significa que é o conteúdo de uma variável Ex: ${PORT} é o conteúdo da variável const PORT que recebeu o valor de 3333.
Listen significa ouvir, escutar, observar. 
console. log é uma função que imprime um texto no console
 
entendendo a lógica: quando clico em send no insomnia ele vem para o server.js que vai localizar as rotas app.use(routes) e vai utiliza-las e será direcionado para o index.js na pasta routes e ao chegar aqui ele localiza o /users ( em routes.use("/users", usersRouter);) ao qual estou querendo acessar lá no insomnia em localhost:3333/users. Após localizado o /users ele vai ser redirecionado para o arquivo userRouter ( em routes.use("/users", usersRouter);) e esse usersRouter contêm todas as rotas do usuário contidas no arquivo users.routes.js na pasta routes e eu quero na raiz "/" para aparecer.

*/
