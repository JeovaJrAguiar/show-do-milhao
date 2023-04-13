import React, { useState } from 'react';
import Header from '../../components/Header';
import { Div } from './styled';
import api from '../../api';
import history from '../../history';

export default function Home() {
  const [statement, setStatement] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correct, setCorrect] = useState("1");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      statement,
      user: {id: JSON.parse(localStorage.getItem('id'))}
    };
    console.log(localStorage.getItem('token'))
    const responseQuestionCreated = await api.post('/questions', data)
    console.log(responseQuestionCreated.data)
    const dataOptions = [{option: option1, question: responseQuestionCreated.data.id}, 
      {option: option2, question: responseQuestionCreated.data.id},
      {option: option3, question: responseQuestionCreated.data.id},
      {option: option4, question: responseQuestionCreated.data.id}
    ]
    switch (correct) {
      case "1":
        dataOptions[0].correct = true;
        break;
      case "2":
        dataOptions[1].correct = true;
        break;
      case "3":
        dataOptions[2].correct = true;
        break;
      case "4":
        dataOptions[3].correct = true;
        break;
      default:
        break;
    }
    dataOptions.forEach(async option => await api.post('/options', option))
    history.goBack()

  };
  
  return (
    <div>
      <Div>
        <form style={
          {
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            justifyContent: 'center', 
            color: 'white',
            width: '100%',
            fontFamily: 'Roboto, sans-serif'
          }
        }
        >
          <label 
          style={
            {
              fontWeight: 'bolder',
              marginBottom: '10px'
          }
          }>Enunciado</label>

          <textarea 
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          style= {
            {
              width: '100%',
              height: '100px',
              border: 'none',
              borderRadius: '12px',
              outline: 'none',
              fontSize: '20px',
              textAlign: 'center'
          }
          }
          />
          <label 
          style={
            {
              fontWeight: 'bolder',
              marginTop: '20px'
          }
          }>Opção 1</label>
          <input 
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          style= {
            {
              width: '100%',
              height: '40px',
              border: 'none',
              borderRadius: '12px',
              marginTop: '10px',
              outline: 'none',
              fontSize: '20px',
              textAlign: 'center'
          }
          }
          />
          <label 
          style={
            {
              fontWeight: 'bolder',
              marginTop: '20px'
          }
          }>Opção 2</label>
          <input 
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          style= {
            {
              width: '100%',
              height: '40px',
              border: 'none',
              borderRadius: '12px',
              marginTop: '10px',
              outline: 'none',
              fontSize: '20px',
              textAlign: 'center'
          }
          }
          />
          <label 
          style={
            {
              fontWeight: 'bolder',
              marginTop: '20px'
          }
          }>Opção 3</label>
          <input 
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
          style= {
            {
              width: '100%',
              height: '40px',
              border: 'none',
              borderRadius: '12px',
              marginTop: '10px',
              outline: 'none',
              fontSize: '20px',
              textAlign: 'center'
          }
          }
          />
          <label 
          style={
            {
              fontWeight: 'bolder',
              marginTop: '20px'
          }
          }>Opção 4</label>
          <input 
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
          style= {
            {
              width: '100%',
              height: '40px',
              border: 'none',
              borderRadius: '12px',
              marginTop: '10px',
              outline: 'none',
              fontSize: '20px',
              textAlign: 'center'
          }
          }
          />
          <label 
          style={
            {
              fontWeight: 'bolder',
              marginTop: '20px'
          }
          }>Opção correta</label>
          <select onChange={e => setCorrect(e.target.value)}>
            <option value="1" selected>Opção 1</option>
            <option value="2">Opção 2</option>
            <option value="3">Opção 3</option>
            <option value="4">Opção 4</option>
          </select>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <button type="button" onClick={handleSubmit} 
            style={
              {
                width: '20%',
                height: '40px',
                border: 'none',
                borderRadius: '12px',
                background: '#F0D514',
                marginTop: '30px',
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: '1.2rem'
            }
            }>Criar</button>
          </div>
        </form>
      </Div>
    </div>
  )
}
