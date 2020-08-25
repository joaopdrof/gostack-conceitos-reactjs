import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  // ADICIONA BOTAO função
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Cleber',
      url: 'http://github.com/cleber',
      techs: ['Node.js']
    })

    setRepositories([ ...repositories,response.data ]);
  }
   // fim ADICIONA BOTAO função

  // REMOVE BOTAO função
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repositorie => repositorie.id != id
    ))
  }
  // fim REMOVE BOTAO função

  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.map(repositorie => (
          <li key={repositorie.id}>
          {repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>
       ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
