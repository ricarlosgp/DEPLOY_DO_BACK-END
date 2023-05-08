const { hash } = require("bcryptjs"); //importando/require de dentro do bcryptjs a função {hash, compare} que vai gerar e comparar a criptografia de senha    

const AppError = require("../utils/AppError"); //importando através do require o arquivo AppError.js de dentro da pasta utils e despejando na minha variável const AppError

class UserCreateService {
    constructor (userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ name, email, password }) {

        const checkUserExists = await this.userRepository.findByEmail (email);

        if (checkUserExists) {//se esse usuário existe checkUserExists ... 
            throw new AppError("Este e-mail já está em uso."); //irei executar uma exceção/THROW novo/new AppError: Este e-mail já está em uso.    
        }

        const hashedPassword = await hash(password, 8); //declarei uma variável ashedPassword que vai receber a função de hash com dois parâmetros:password e 8. Esse 8 é o salt que é o fator de complexidade do hash ou seja, no máximo 8 caracteres deverá ter a senha   
        
        const userCreated = await this.userRepository.create({ name, email, password: hashedPassword}); //pegando o await e o database e irei executar/run uma inserção/INSERT em/INTO tabela de usuários nas colunas: name, email, password passando os três valores/VALUES(?, ?, ?), de meu vetor passando o [name, email, hashedPassword] que recebo lá do meu usuário quando ele me enviar(const { name, email, Password} = request.body). obs: não inseri o id pois ele é colocado de forma automática assim como o created_at e updated_at. obs: hashedPassword é minha senha criptografada 

        return userCreated;
    }
}

module.exports = UserCreateService;