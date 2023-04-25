import axios from "axios"; //importando o axios

export const api = axios.create({ //exportando o const api e utilizando um método dentro do axios chamado de create.
    baseURL: 'http://localhost:3333' //passando uma propriedade chamada de baseURL incluindo a parte do endereço da API que se repete em todas as requisições que é o endereço do backend rodando no computador "http://localhost:3333"
});

