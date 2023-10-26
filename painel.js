
import React, { useState } from 'react';

function App() {
  const [cnpj, setCnpj] = useState('');
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);

  const consultarCNPJ = async () => {
    try {
      const response = await fetch(`https://minhareceita.org/${cnpj}`);
      const data = await response.json();
      setDados(data);
      setErro(null);
    } catch (error) {
      setErro('Ocorreu um erro na consulta.');
      setDados(null);
    }
  };

  return (
    <div className="App">
      <h1>Consulta de CNPJ</h1>
      <input
        type="text"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
        placeholder="Digite o CNPJ"
      />
      <button onClick={consultarCNPJ}>Consultar</button>

      {erro && <div className="erro">{erro}</div>}

      {dados && (
        <div className="dados">
          <h2>Dados da Empresa:</h2>
          <p>Razão Social: {dados.razao_social}</p>
          <p>Nome Fantasia: {dados.nome_fantasia}</p>
          <p>Endereço: {dados.logradouro}, {dados.numero}</p>
          <p>Bairro: {dados.bairro}</p>
          <p>Cidade: {dados.municipio}</p>
          <p>Estado: {dados.uf}</p>
        </div>
      )}
    </div>
  );
}

export default App;
