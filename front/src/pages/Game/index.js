import React from 'react';
import { Div, Div2 } from './styled';
import { useState, useEffect } from 'react';
import api from '../../api';
import history from '../../history';
import Loser from '../../components/Loser';
import Accept from '../../components/Accept'
import Win from '../../components/Win'

export default function Game() {
  const id = JSON.parse(localStorage.getItem('id'))
  const [finished, setFinished] = useState(false);
  const [win, setWin] = useState(false);
  const [accept, setAccept] = useState(false);
  const [helped, setHelped] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [round, setRound] = useState(0);
  const [ganhos, setGanhos] = useState(0);
  const [acertar, setAcertar] = useState(0);
  const [errar, setErrar] = useState(0);
  const [parar, setParar] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState({});
  async function getData(){
    if(questions.length === 0){
      const {data} = await api.get('/questions')
      setQuestions(data)
    }
    console.log(questions)
    loadUser()

  }
  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    setValues()
  }, [round]);

function compare (a, b) {
  if (a.id < b.id) { return -1 }
  if (a.id > b.id) { return 1 }
  return 0
}
  async function response(e){
    console.log(e.target)
    const option = e.target.innerHTML
    const valuation = questions[round].options.filter(el => el.option === option && el.correct)
    if (valuation.length === 0) {
      setQuestionsAnswered(questionsAnswered + 1)
      setFinished(true)
      return await api.post('/games', {user: id, award: ganhos, help: helped, finished: 2, questions: questionsAnswered + 1 })
    }
    if(round < 6) {
      setQuestionsAnswered(questionsAnswered + 1)
      setAccept(true)
      setRound(round + 1)
      getData()
    }
    else {
      setGanhos(1000000)
      setWin(true)
      await api.post('/games', {user: id, award: ganhos, help: helped, finished: 1, questions: questionsAnswered + 1 })
    }
  }
  async function loadUser(){
    const {data} = await api.get(`users/${id}`)
    console.log(data)
    setUser(data)
  }
  function setValues() {
    switch (round) {
      case 0:
        setAcertar(1000)
        break;
      case 1: 
        setGanhos(1000)
        setAcertar(5000)
        setParar(1000)
        setErrar(500)
        break
        case 2:
        setGanhos(5000)
        setAcertar(50000)
        setParar(5000)
        setErrar(2500)
        break
      case 3:
        setGanhos(50000) 
        setAcertar(100000)
        setParar(50000)
        setErrar(25000)
        break
      case 4: 
        setGanhos(100000)
        setAcertar(300000)
        setParar(100000)
        setErrar(50000)
        break
      case 5:
        setGanhos(300000)
        setAcertar(500000)
        setParar(300000)
        setErrar(150000)
        break
      case 6:
        setGanhos(500000)
        setAcertar(1000000)
        setParar(500000)
        setErrar(0)
        break
      default:
        break;
    }
  }
  function helper(){
    let count = 0
    let corrected
    questions[round].options.forEach(option => {
      if(option.correct) corrected = option
    })
    const options = document.querySelectorAll('.options')
    for(let i = 0 ; i < 4 ; i++) {
      if(count < 2 && options[i].innerHTML !== corrected.option) {
        options[i].style.backgroundColor = 'red'
        count++
      }
    }
    setHelped(true)
  }
  async function pause(){
    await api.post('/games', {user: id, award: ganhos, help: helped, finished: 3, questions: questionsAnswered })
    history.push('/')
  }
  async function denunciation(){
    if(questions[round].denunciation){
      await api.put(`questions/${questions[round].id}`, {status: 1, user: {id}})
      await api.post('/games', {user: id, award: ganhos, help: helped, finished: 4, questions: questionsAnswered })
      return history.push('/')
    }
    await api.put(`questions/${questions[round].id}`, {denunciation: true})
    await api.post('/games', {user: id, award: ganhos, help: helped, finished: 4, questions: questionsAnswered })
    history.push('/')
  }
  return (
    <div  style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
      {win && <Win nickname={user.nickname} />}
      {finished && <Loser nickname={user.nickname} ganhos={ganhos} round={round + 1} />}
      {accept && <Accept nickname={user.nickname} ganhos={ganhos} round={round + 1} acertar={acertar} setAccept={setAccept} />}
      <Div>
        <div style={{width: '100%', height: '50vh', background: 'black', color:'white', marginTop: '5vh', borderRadius: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '400', marginLeft:'1vw'}}>
        <h3>{questions[round] && questions[round].statement}</h3>
        </div>

        <div style={{width: '100%', background: 'transparent', color:'white', marginTop: '5vh', borderRadius: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', fontWeight: '400', marginLeft:'1vw'}}>
        {questions[round] && questions[round].options.map(option => {
          return(
            <h4 className='options' key={option.id} onClick={response} style={{background: 'white', color: 'black', borderRadius: '15px', width: '80%', height: '7vh', margin: '5px', display: 'flex', justifyContent:'center', alignItems: 'center', cursor: 'pointer'}}>{option.option}</h4>
          )
        })}
        </div>
      </Div>
      <Div2>
        <div style={{width: '60%', height: '20vh', backgroundColor: 'black', color:'white', marginTop: '5vh', borderRadius: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft:'2vw'}}>
          <p style={{ color: 'white', borderRadius: '15px', width: '80%', height: '25%', margin: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer', textAlign: 'left'}}><pre style={{ fontFamily: 'Roboto'}}><strong>Jogador: </strong>{user.nickname}</pre></p>

          <p style={{ color: 'white', borderRadius: '15px', width: '80%', height: '25%', margin: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer', textAlign: 'left'}}><pre style={{ fontFamily: 'Roboto'}}><strong>Rodada: </strong>{round+1}</pre></p>

          <p style={{ color: 'white', borderRadius: '15px', width: '80%', height: '25%', margin: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer', textAlign: 'left'}}><pre style={{ fontFamily: 'Roboto'}}><strong>Ganho: R$ </strong>{ganhos}</pre></p>
        </div>
        <div style={{width: '60%', height: '20vh', backgroundColor: 'black', color:'white', marginTop: '5vh', borderRadius: '30px', display: 'flex', flexDirection: 'column',alignItems: 'center', marginLeft:'2vw'}}>
          <p style={{ color: 'white', borderRadius: '15px', width: '80%', height: '25%', margin: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer', textAlign: 'left'}}><pre style={{ fontFamily: 'Roboto'}}><strong>Acertar: R$ </strong>{acertar},00</pre></p>

          <p style={{ color: 'white', borderRadius: '15px', width: '80%', height: '25%', margin: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer', textAlign: 'left'}}><pre style={{ fontFamily: 'Roboto'}}><strong>Parar: R$ </strong>{parar}</pre></p>

          <p style={{ color: 'white', borderRadius: '15px', width: '80%', height: '25%', margin: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer', textAlign: 'left'}}><pre style={{ fontFamily: 'Roboto'}}><strong>Errar: R$ </strong>{errar}</pre></p>
        </div>
        {!helped && 
          <button type="button" className='helper' onClick={helper} style={{
            width: '60%',
            height: '14%',
            border: 'none',
            background: 'green',
            borderRadius: '25px',
            cursor: 'pointer',
            color: '#fff',
            marginTop: '3vh',
            marginLeft: '2vw',
            fontSize: '20px'
          }}>Eliminar duas respostas</button>
        }
        <button onClick={pause} type="button" style={{
              width: '60%',
              height: '14%',
              border: 'none',
              background: '#F0D514',
              borderRadius: '25px',
              cursor: 'pointer',
              color: '#fff',
              marginTop: '3vh',
              marginLeft: '2vw',
              fontSize: '20px'
            }}>Parar</button>
        <button type="button" style={{
              width: '60%',
              height: '14%',
              border: 'none',
              background: 'red',
              borderRadius: '25px',
              cursor: 'pointer',
              color: '#fff',
              marginTop: '3vh',
              marginLeft: '2vw',
              fontSize: '20px'
            }}
            onClick={denunciation}
            >Denunciar pergunta</button>
      </Div2>

    </div>
  )
}
