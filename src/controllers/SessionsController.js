/*
1 - async\assíncrona pois será uma função que irá envolver conexão com o banco de dados
2 - create pois iremos criar uma sessão(o controller sempre terá 5 métodos: criar, atualizar, deletar, index e show) então, estamos create\criando uma sessão pois irei dar um código, um token para o usuário por isso uso o método create.
3 - request,response são os parâmetros do async create que iremos acessar

*/
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth"); //usamos o authConfig que são as configurações do auth.js 
const { sign } = require("jsonwebtoken"); //importei o { sign } que é um método do jsonwebtoken  

class SessionsController {
  async create(request, response){ 
    const { email, password } = request.body; //pegando o email e password do request.body

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, { //passei para esse sign um objeto vazio {} com a chave secret 
      subject: String(user.id), //coloquei um subject inserindo do token o id do usuário convertendo para texto 
      expiresIn //coloquei quando vai ser a expiração dele que no caso foi 1d
    })

    return response.json({user, token});

   // return response.json({email, password}) //utilizando o return nas funções pois garante que ao chegar aqui ele vai parar a execução do create 
  } 
}
module.exports = SessionsController;