/*
- AppError.js para padronizar qual é o tipo de mensagem que vai aparecer quando eu tiver um tipo de exceção ou seja, mesmo que apareça algum erro a nossa aplicação vai continuar a funcionar.
- ao criar as duas variáveis: message e statusCode no topo da classe faz com que toda a minha classe tome conhecimento dela e consegue acessar ela dentro de qualquer outra funcionalidade.
- toda classe têm um método constructor que é carregado automaticamente quando a classe é instanciada e toda vez que alguém for instanciar, utilizar essa classe eu quero saber: do message e do statusCode ou seja: constructor(message, statusCode=400) e caso o statusCode não seja informado irei dizer que o padrão dele é igual 400 que se refere a Bad Request e essa faixa 4XX no código HTTP está relacionado a Erro do cliente e dentro dessa faixa temos: 400=Bad Request, 401=Unauthorized e 404=Not Found.
- após feito todo procedimento da class AppError e de ter exportado com o module.exports o próximo passo é importar essa class AppError no usersController.js da pasta controllers
*/

class AppError {
    message;
    statusCode;

    constructor(message, statusCode = 400){
        this.message = message; //estou pegando o message que vai chegar pelo constructor da minha classe e estou repassando ela para o this.massage que é a variável message que faz parte do contexto global ou seja, message do escopo class AppError  
        this.statusCode = statusCode; //repassando o statusCode do meu constructor para a variável global statusCode através do this.statusCode
    }
}

module.exports = AppError; //exportando minha classe de erro AppError

//simule um erro no usersController.js da pasta controllers