module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || "default", //"e62acc1669df5fca4ae65853ffb190d8", esse secret é uma propriedade que contêm uma palavra ou chave que será utilizado para poder gerar o token. É a frase secreta. Podemos usar o site: https://www.md5hashgenerator.com/ para gerar um Hash aleatório (MD5 Hash) Ex: e62acc1669df5fca4ae65853ffb190d8  vai ser minha chave secreta mais forte e não podemos perder. Agora, é só levar esse Hash, essa chave secreta para o .env (AUTH_SECRET=e62acc1669df5fca4ae65853ffb190d8) e para utilizar esse e62acc1669df5fca4ae65853ffb190d8 eu troco essa chave por: process.env.AUTH_SECRET,
        expiresIn: "1d" // aqui é o tempo de expiração que terá validade de 1 dia
    }
}
