
import React, { useState, useEffect } from 'react';
import './styles.css';
import { Card } from '../../components/Card';

export function Home() {

  const [nomeDoMalandro, setNomeDoMalandro] = useState('');
  const [malandros, setMalandros] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' });

  function addNovoMalandro() {

    const dadosDoMalandro = {

      name: nomeDoMalandro,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })

    };

    setMalandros(dadosDoMalandroAnterior => [...dadosDoMalandroAnterior, dadosDoMalandro]);
  }

  useEffect(() => {
    // aqui fica as ações
    fetch('https://api.github.com/users/sailleribeiro')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
      })

  }, []);

  return (
    <div className='Container'>
      <header>
        <h1> Olá meu mano </h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='foto de perfil' />
        </div>

      </header>


      <input
        type="text"
        placeholder='Seu nome.....'
        onChange={e => setNomeDoMalandro(e.target.value)}
      />

      <button type='button' onClick={addNovoMalandro}>
        Adicionar
      </button>


      {
        malandros.map(malandro => (
          <Card
            key={malandro.time}
            name={malandro.name}
            time={malandro.time}
          />
        ))

      }
    </div>
  )
}