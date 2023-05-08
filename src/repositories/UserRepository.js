const sqliteConnection = require("../database/sqlite") //importando através do require meu index.js onde consta o async function sqliteConnection e despejar em minha const sqliteConnection. Estou importando minha conexão com o banco de dados.

class UserRepository {
    async findByEmail(email) {
        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        return user;
    }

    async create({name, email, password}) {
        const database = await sqliteConnection();

        const userId = await database.run(
            "INSERT INTO users (name, email, Password) VALUES(?, ?, ?)",
            [name, email, password]
            ); //pegando o await e o database e irei executar/run uma inserção/INSERT em/INTO tabela de usuários nas colunas: name, email, password passando os três valores/VALUES(?, ?, ?), de meu vetor passando o [name, email, hashedPassword] que recebo lá do meu usuário quando ele me enviar(const { name, email, Password} = request.body). obs: não inseri o id pois ele é colocado de forma automática assim como o created_at e updated_at. obs: hashedPassword é minha senha criptografada 

            return { id: userId };
        }   
}

module.exports = UserRepository;