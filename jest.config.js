module.exports = {
  bail: true,
  coverageProvider: "v8",

  testMatch: [//o meu teste têm esse diretório:
    "<rootDir>/src/**/*.spec.js" //partindo da raiz do nosso projeto(<rootDir>) estou pedindo para o jest olhar dentro da pasta src e dentro de qualquer pasta em src(**/) o arquivo pode ter qualquer nome(*.) desde que seja um arquivo de teste ou spec.js (*.spec.js)
  ],
}