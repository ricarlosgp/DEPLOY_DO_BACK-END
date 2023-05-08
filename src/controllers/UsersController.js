/* 
*controllers é a camada responsável por processar as requisições de nossa aplicação/app/API ou node.js 
*o nome da class têm que ser idêntica ao arquivo.js criado
*estou usando class ao invés de função pois dentro do escopo da class eu posso criar e ou acessar várias funções.
* um Controller pode ter no mínimo um e no máximo cinco métodos que são: 
1 - index - que é um método GET para listar vários registros. Ex: quero listar todos os usuários cadastrados.
2 - show - que também é um método GET para exibir um registro específico. Ex: carregar os dados de um usuário específico.
3 - create - utilizado como método POST para poder criar um registro.
4 - update - utilizado como método PUT para atualizar um registro.   
5 - delete - DELETE para remover um registro.    
6 - ("../utils/AppError") - saindo da pasta que estou UsersController.js para pasta raiz do projeto src ../ acessando a pasta utils de dentro do src/acessando o arquivo AppError de dentro de utils 
7 - create(request, response) - irei criar um registro e preciso de uma requisição/request e preciso de uma resposta/response 
8 - require - significa que estou importando algo
9 - !name - se o name não existe. O ! é uma negação
10 - npm install express-async-errors --save é uma biblioteca a ser instalada pelo terminal VSC e que deve ser importada no server.js
11 - get pois quero buscar por informações 
11 - ("SELECT * FROM users WHERE email = (?)", [email]) - listando/SELECT tudo * da tabela users/FROM users onde/WHERE o email seja igual ao conteúdo de minha variável(?), e o vetor[] da variável(?) que irei substituir é o [email] e se tivesse outras ? eu colocaria na sequencia 
12 - npm install bcryptjs  - se verificar no sgbd beekeeper a senha dos usuários estão visíveis e para ocultar precisamos do bcryptjs 
13 - {hash} é uma função para gerar criptografia
14 - UPDATE users SET atualize na tabela usuários e defina/SET o seguinte valor
15 - await só ficará disponível se a função for async
16 - DATETIME('now') - estou pegando essa função a data e hora agora/now do banco de dados e não do javascript. Com essa função o dia e hora vai ficar no padrão GMT
*/
const { hash, compare } = require("bcryptjs"); //importando/require de dentro do bcryptjs a função {hash, compare} que vai gerar e comparar a criptografia de senha    

const AppError = require("../utils/AppError"); //importando através do require o arquivo AppError.js de dentro da pasta utils e despejando na minha variável const AppError

const UserRepository = require("../repositories/UserRepository");
const sqliteConnection = require("../database/sqlite"); //importando através do require meu index.js onde consta o async function sqliteConnection e despejar em minha const sqliteConnection. Estou importando minha conexão com o banco de dados.
const UserCreateService = require("../services/UserCreateService");

class UsersController {
  
    async create(request, response) {//como estou usando o método async então preciso do método await para ficar disponível
        const { name, email, password} = request.body; //estou acessando meu body dentro do request(request.body) que são o name, email, password e estou capturando esse dados através para minha const{ name, email, password}.
        
        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);
        await userCreateService.execute({ name, email, password});

        return response.status(201).json(); //irei retornar/return um response com status 201 de criado e irei devolver um json vazio 
    }

    async update(request, response) {//criando funcionalidade async/assíncrona de atualização do usuário e irei precisar do request e response
        const { name, email, password, old_password} = request.body; //pegando as informações {name, email} de request.body
        const user_id = request.user.id;

        const database = await sqliteConnection(); //criando minha conexão com o banco de dados
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);//buscando em todos * os campos da tabela usuário onde/WHERE o id seja igual(?), aí passo o id do usuário que estou procurando [id]    

        if (!user) { //se/if usuário não existir !user ...
            throw new AppError("Usuário não encontrado"); //... irei lançar uma exceção/throw com o meu new AppError dizendo: Usuário não encontrado  
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]); //verificando se a pessoa está inserindo um email que já existe. Buscando em todos * os campos da tabela usuário onde/WHERE o email seja igual(?), aí passo o email do usuário que estou procurando [email]

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id ) {
        //se/if encontrar um email/userWithUpdatedEmail && se dentro desse userWithUpdatedEmail.id for diferente/!== do id do usuário(significa que ele está tentando mudar email para um que já existe) 

            throw new AppError("Este e-mail já está em uso.");
            //... irei lançar uma exceção/throw com o meu new AppError dizendo: Este e-mail já está em uso.
        }

        user.name = name ?? user.name; // = se existir conteúdo dentro de nome/name então ele será utilizado ele ou/?? se não existir quem vai ser utilizado é o user.name ou seja, continuar o que já estava
        user.email = email ?? user.email;

        if(password && !old_password){//se a pessoa digitou a senha/password nova e/&& ela não digitou a senha antiga/!old_password então apresente a mensagem de erro/throw new AppError
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
        }

        if(password && old_password) { //se/if password e/&& old_password foram informados faça:
            const checkOldPassword = await compare(old_password, user.password);//comparando/compare com o await pois é assíncrona/async a senha antiga/old_password comparando com a senha do usuário/user.password que está criptografada
            if(!checkOldPassword) {//se checkOldPassword for falsa ou seja: se a senha antiga não for igual(não confere) a com a senha do user.password então apresente a mensagem de erro
                throw new AppError("A senha antiga não confere");
            }

            user.password = await hash(password, 8); //se passou por todos os if ou seja, se a senha dele bateu então eu deixo atualizar a senha fazendo a criptografia dela passando o número 8 para ser o meu salt   

        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id] //esse array deverá estar na mesma sequencia da lista acima do await        
        );

        return response.status(200).json();
    }
}

module.exports = UsersController; //exportando através do module.exports a class UsersController

//obs: para testar abra o insomnia e cadastre o usuário com name, email e password clica em send e abra o sgbd beekeeper em view data e veja que o id, created_at e updated_at foi automático

//obs: se verificar no sgbd beekeeper a senha dos usuários estão visíveis e para ocultar precisamos do npm install bcryptjs 