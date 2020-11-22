import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

import api from '../../services/api';

import Header from '../../components/Header';

import './styles.css';

export default function Course(){
  const loggedUser = localStorage.getItem('authorizedEmail');
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    api.get('curso').then(res => setCursos(res.data.cursos));
  }, [loggedUser]);

  async function handleDeleteCourse(id) {
    try {
      await api.delete(`curso/${id}`)
    }catch(err){
      alert(err);
    }
  }

  return(
    <div>
      <Header title="Cursos" text="Criar" link="/new-course"/>
      <main className="course-container">
        <h1>Bem Vindo, {loggedUser.split('@')[0]}</h1>
        <ul>
        {cursos ? cursos.map(curso =>  (
          <li key={curso.id}>
            <p>{curso.nome}</p>
            <p>Prof alvares de azevedo</p>
            <p>sala 502</p>
            <p>{curso.inicio} as {curso.fim}</p>
            <button type="button" onClick={() => handleDeleteCourse(curso.id)}>
              <FiX size={20}/>
            </button>
          </li>
          )) : (
            <h1>Nenhum curso cadastrado</h1>
          )}
        </ul>
      </main>
    </div>
  )
}