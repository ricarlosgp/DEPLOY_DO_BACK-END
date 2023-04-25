//arquivos de configurações do upload que iremos utilizar em nosso aplicativo

const path = require("path");//importando o path que é do próprio node
const multer = require("multer");//importando o multer instalado pelo npm
const crypto = require("crypto");
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp"); // criei uma pasta temporária TPM_FOLDER e irei utilizar dentro do patch o resolve e irei usar o dirname para pegar a pasta onde estou, irei sair dessa pasta configs "..", irei sair da pasta src "..", e na raiz irei acessar a pasta tmp. TMP_FOLDER é a pasta, é o endereço onde a imagem chega
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); //criei uma pasta dentro de tmp onde os arquivos irão ficar chamada de UPLOADS_FOLDER irei pegar o patch utilizando o resolve e pegando a pasta onde estou com o __dirname e dentro dessa pasta teremos uma pasta chamada de uploads. UPLOADS_FOLDER é a pasta, é o endereço onde a imagem irá ficar  

const MULTER = {//o MULTER é a biblioteca que iremos utilizar para fazer upload
    storage: multer.diskStorage({//storage é a propriedade para onde iremos mandar o arquivo que nesse caso é para pasta temporária TMP_FOLDER quando ele for carregado pela aplicação
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex"); //utilizamos a crypto para gerar um número aleatório para combinar com o nome da imagem(originalmente) para garantir que o usuário não tenha imagem duplicadas para que uma imagem não sobreponha a outra
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },

    }),
};

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}