const { verify } = require("jsonwebtoken"); // importando o {verify} que é uma função que está disponível dentro do jsonwebtoken  
const AppError = require("../utils/AppError"); //importando o AppError de dentro da pasta utils
const authConfig = require("../configs/auth"); // importando o authConfig para obter de como está as configurações de autenticação que está dentro de configs/auth

function ensureAuthenticated(request, response, next){//criando uma função que vai ter o mesmo nome do arquivo ou seja: ensureAuthenticated e nessa função irei receber uma requisição/request, a resposta/response e obter o next pois o middleware sempre receber o next para chamar a próxima função que é destino da requisição. 
    const authHeader = request.headers.authorization; // criei uma const authHeader para obter um cabeçalho ao qual irei acessar a requisição/request e dentro da requisição irei acessar o cabeçalho/headers e dentro do cabeçalho irei acessar por um authorization. Então, o token do usuário vai estar dentro da requisição do usuário e em seu cabeçalho e dentro do cabeçalho vai haver o token de autorização/authorization.
    if(!authHeader){ //se não tiver nada dentro de authHeader ou seja, se não existe token
        throw new AppError("JWT Token não informado", 401); //lance uma exceção utilizando o AppError com código 401   
    }

    const [, token] = authHeader.split(" "); //se o token existe irei acessar através de um vetor[] que está dentro do header e dentro do header o token é armazenado tipo assim "Bare xxxxx". O split pega a string separando a string e passando ela para um vetor e o split precisa saber qual é o caractere que ele vai usar como referência para ele quebrar um texto em string e nesse caso vai um espaço entre aspas(" ") ou seja, ele vai dar o espaço entre o Bare xxxx sendo que na 1ª posição eu tenho o Bare e na 2ª posição o token que é o xxx por isso colocado no vetor const [, token]. Concluindo: estamos quebrando esse texto com split(" ") em um array e pegando a 2ª posição do array já passando para uma variável chamada de token    

    try {//dentro do try irei verificar se o token é válido
        const { sub: user_id } = verify(token, authConfig.jwt.secret); //pegando a função verify passando para ela o token e passo para ela de dentro do authConfig o jwt pegando de dentro do jwt o secret para verificar se é um token válido e consigo acessar dessar desse verify o seguinte: ele devolve um sub que é o conteúdo que está armazenado lá e irei converter esse sub para um user_id então se o token é válido ele vai me devolver esse sub ao qual estou criando um apelido para ele de user_id ou seja: ao invés de chamar sub vai ser chamado user_id.

        request.user = {//pegando minha requisição e dentro dela irei criar uma propriedade chamada de user e dentro dela irei criar uma propriedade chamada id ao qual irei voltar ela para um número que vai ser o user_id 
            id: Number(user_id), //criei uma propriedade chamada id que irei voltar ela para um número que vai ser o user_id 
        };

        return next( ); //se deu tudo certo, daremos um return em nex para chamar a próxima função  
    } catch { //caso o token seja inválido 
        throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;