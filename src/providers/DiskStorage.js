/*O try é uma declaração que permite definir um bloco de código a ser testado quanto a erros enquanto está sendo executado.
O catch é uma declaração que permite definir um bloco de código para ser executado, se ocorrer um erro no bloco de tentativa.
O try e catch são palavras-chave que trabalham juntas.
*/

//aqui no diskStorage será salvo os arquivos de onde o nosso Backend estiver hospedado
const fs = require("fs"); //importando o fs que é do próprio node.js para lhe dar com manipulação de arquivos 
const path = require("path"); //importando o path para lhe dar com os diretórios, para navegarmos pelos diretórios
const uploadConfig = require("../configs/upload");//irei importar o nosso uploadConfig que está dentro dentro da pasta de configurações("../configs/upload")

class DiskStorage{ //irei criar ele como uma classe que irei chamar de DiskStorage e essa classe vai ter duas funções que serão assíncronas:
    async saveFile(file){//a primeira vai ser a de saveFiles ou seja de salvar o arquivo que será passado como um parâmetro(file) para essa função     
        await fs.promises.rename(//aí irei pegar o await pois se trata de função assíncrona/async, vou utilizar o fs e vou pegar a função de promises e irei por um rename que irei mudar o arquivo de lugar  
            path.resolve(uploadConfig.TMP_FOLDER,file),//irei pegar aqui o path.resolve, irei pegar o arquivo uploadConfig de dentro da pasta temporária/TMP_FOLDER, e aqui eu passo o nome do arquivo/file, e irei levar ele para a nova pasta aí eu pego...
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)//pego o path.resolve, coloco o uploadConfig só que agora vai para o UPLOADS_FOLDER o file qie é o arquivo
            
            //lógica: quando for fazer o upload da imagem e quando ela chega no backend ela vai ser carregada na pasta temporária, vai ficar esperando na pasta temporária para o backend decidir o que fazer com a imagem e quando for salvar o arquivo agente pega da pasta temporária e envia ela para pasta de upload que onde de fato ela vai ficar. Então essa função de rename do fs é para poder mudar o arquivo de lugar.      
        );

        return file;//iremos retornar as informações desse próprio arquivo/file  
    }

    async deleteFile(file){//a segunda função vai ser a de deletar um arquivo que também receberá o arquivo/file
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);//criando um filePath para pegar o endereço desse arquivo path.resolve e irei procurar por esse arquivo na pasta de uploadConfig buscando na pasta UPLOADS_FOLDER passando o nosso arquivo/file   
        
        try {//sempre que trabalhar com manipulação de arquivo é bom trabalhar com tratamento de exceções pois às vezes o arquivo não existe mais. Por isso iremos usar o try e o catch 
         
            await fs.promises.stat(filePath);//aqui dentro da tratativa que é o try iremos usar o await, utilizar o promises e pegar o filePath.
        }catch {//caso alguma coisa dê errado, utilizaremos o return
            return;
        }

        await fs.promises.unlink(filePath);// iremos passar um await fs.promises e para deletar pegamos através do unlink e pass o nosso filepath
    }
}

module.exports = DiskStorage;