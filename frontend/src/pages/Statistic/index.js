import React from 'react';
import api from '../../api';
import { useState } from 'react';
import { useEffect } from 'react';
import history from '../../history';

export default function User() {
  const [user, setUser] = useState({})
  const [questionsAccept, setQuestionsAccept] = useState([])
  const [questionsReject, setQuestionsReject] = useState([])
  const [games, setGames] = useState([])
  const id = JSON.parse(localStorage.getItem('id'))
  async function getData(){
    console.log(id)
    if(id !== null){
      const {data} = await api.get(`/users/${Number(id)}`)
      setUser(data)
      console.log(data)
      setQuestionsAccept(data.questions.filter(question => question.status.id === 2))
      setQuestionsReject(data.questions.filter(question => question.status.id === 3))
      setGames(data.games)
    }
  }
  useEffect(() => {
      getData()
  }, []);
  function getAwardAll(){
    let qtd = 0
    games.forEach(game => {
      qtd += game.award
    })
    return qtd
  }
  function getHelps(){
    let qtd = 0
    games.forEach(game => {
      if(game.help) qtd += 1
    })
    return qtd
  }
  function getQuestionsAnswered(){
    let questions = 0
    games.forEach(game => {
      questions +=game.questions
    })
    return questions
  }
  function getGamesLoser(){
    let gamesLoser = 0
    games.forEach(game => {
      if(game.finished.id === 2) gamesLoser += 1
    })
    return gamesLoser
  }
  function getGamesPause(){
    let gamesPause = 0
    games.forEach(game => {
      if(game.finished.id === 3) gamesPause += 1
    })
    return gamesPause
  }
  function profile(){
    history.push('/users/' + id)
  }
  return (
    <>
  <form>
    <div style={{display: 'flex', width: '95vw', height: '90vh', marginLeft: '2vw', marginTop: '5vh'}}>
    <div style={{width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px', border: '2px solid #0790F3'}}>
        <button style={{width: '95%', height: '5vh', margin: '5px', borderRadius: '10px', background: '#040B49', color: '#fff', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: 'bolder', fontSize: '19px', cursor: 'pointer'}}  onClick={profile}>Minha conta</button>
        <button style={{width: '95%', height: '5vh', margin: '5px', borderRadius: '10px', background: '#0F1C8E', color: '#fff', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: 'bolder', fontSize: '19px', cursor: 'pointer'}}>Minhas estatísticas</button>
      </div>
      <div style={{marginLeft: '2vw', borderRadius: '10px', border: '2px solid #0790F3', width: '70%', color:' white', fontSize: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', fontWeight: '500'}}>
        <span>Perguntas adicionadas e aceitas:: {questionsAccept.length}</span>
        <span>Perguntas adicionadas e não aceitas: {questionsReject.length}</span>
        <span>Número de partidas jogadas: {games.length}</span>
        <span>Número total de perguntas respondidas:: {getQuestionsAnswered()}</span>
        <span>Premiação total de todas as partidas jogadas: {getAwardAll()}</span>
        <span>Quantidade de utilizações da eliminação de duas alternativas: {getHelps()}</span>
        <span>Número de derrotas por erro da resposta: {getGamesLoser()}</span>
        <span>Número de derrotas por pedido de parada: {getGamesPause()}</span>
      </div>
    </div>
  </form>
    </>
  );
}
