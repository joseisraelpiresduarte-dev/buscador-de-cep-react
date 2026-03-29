import axios from "axios";

// Criando uma instância do axios com a URL base da API do ViaCEP
const api = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export default api;