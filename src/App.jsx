// Importando os ícones e hooks necessários
import { FiSearch } from 'react-icons/fi';

// Importando os estilos e a instância do axios para fazer as requisições à API
import { useEffect, useState } from "react";

import './styles.css';
import api from './services/api';


function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const [show, setShow] = useState(false); // estado da animação

  // useEffect para controlar a animação de exibição dos dados do CEP
  useEffect(() => {
    if (Object.keys(cep).length > 0) {
      setTimeout(() => setShow(true), 50);
    } else {
      setShow(false);
    }
  }, [cep]);

  // Função para buscar o CEP usando a API do ViaCEP
  async function handleSearch() {
    if (input === '') {
      alert('Preencha algum CEP!');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert("Ops erro ao buscar!");
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input 
          type="text"
          placeholder="Digite seu CEP..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className={`main ${show ? "show" : ""}`}>
          <h2>{cep.cep}</h2>

          <div className="info">
            <p>{cep.logradouro}</p>

            {cep.complemento && (
              <p className="complemento">
                Complemento: {cep.complemento}
              </p>
            )}

            <p>{cep.bairro}</p>
            <p>{cep.localidade} - {cep.uf}</p>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;