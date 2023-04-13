import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context/AuthContext';
import Header from '../../components/Header';
import { DivAccept, DivNotAccept } from './styled';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState({});
  async function getData(){
    const id = JSON.parse(localStorage.getItem('id')) 
    const {data} = await api.get(`/users/${Number(id)}`)
    setUser(data)
    setQuestions(data.questions)
  }
  useEffect(() => {
      getData()
  }, []);
  console.log(questions)
  return (
    <>
      <div>
        <div>
          <div style={{width: '40%', textAlign: 'center'}}>
          <Link to='/questions-add'>
          <button type="button" style={{
              width: '200px',
              height: '40px',
              border: 'none',
              background: '#F0D514',
              borderRadius: '25px',
              cursor: 'pointer',
              color: '#fff',
              marginTop: '5vh'
            }}>Adicionar perguntas</button>
          </Link>
          </div>
          <DivAccept>
            <div style={{overflowY: 'scroll', width: '100%', maxHeight: '40vh'}}>
            <h2> Perguntas aceitas</h2>
            {questions.map(question => {
              if(question.status.id === 2){
                  return (
                    <div key={question.id} >
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                      <div style={{margin: '10px', color: 'green', fontSize: '1.2rem'}}>
                        <span>{question.statement}</span>
                      </div>
                      <hr/>
                    </div>
                  );
                
              }
                })}
            </div>
          </DivAccept>

          <DivNotAccept>
            <div  style={{overflowY: 'scroll', width: '100%', maxHeight: '40vh'}}>
            <h2> Perguntas não aceitas</h2>
            {questions.map(question => {
              if(question.status.id === 3){
                  return (
                    <div key={question.id}>
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                        <div style={{margin: '10px', color: 'red', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between'}}>
                          <span>{question.statement}</span>
                          <Link to = {'/questions-update/' + question.id} style={{cursor: 'pointer', textDecoration: 'none', color: '#fff'}}>
                          <button style={{width: '70px', height: '5vhrem', background: '#00ff00', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px'}}>Editar</button>
                          </Link>
                        </div> 
                      <hr/>
                    </div>
                  );
                
              }
                })}
            </div>
          </DivNotAccept>
        </div>
  
      </div>

    </>
  );
}
