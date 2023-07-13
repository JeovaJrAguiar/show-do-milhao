import React from 'react';
import api from '../../api';
import { useState } from 'react';
import { useEffect } from 'react';
import history from '../../history';
import { Div } from './styled';
import trophy from '../../assets/images/1986987.png'
import { FaUserAlt } from 'react-icons/fa';
export default function Ranking() {
  const [ranking, setRanking] = useState([])
  const [userLogged, setUser] = useState({})
  async function getUserLogged(){
    const {data} = await api.get(`users/${JSON.parse(localStorage.getItem('id'))}`)
    setUser(data)
  }
  async function getData(){
    const {data} = await api.get('users')
    function getRanking(){
      const users = []
      data.map(user => {
        let count = 0
        let countLoser = 0
        user.games.map(game => {
          count += game.award
          if(game.finished.id === 2 || game.finished.id === 3) countLoser += 1
        })
        users.push({name: user.name, nickname: user.nickname, allAward: count, losers: countLoser})
      })
      return users
    }
    console.log(mergeSort(getRanking()))
    setRanking(mergeSort(getRanking()).reverse())
    }
  function merge(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0].allAward < right[0].allAward) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [ ...arr, ...left, ...right ]
}
function mergeSort(array) {
  const half = array.length / 2
  
  // Base case or terminating case
  if(array.length < 2){
    return array 
  }
  
  const left = array.splice(0, half)
  return merge(mergeSort(left),mergeSort(array))
}
  useEffect(() => {
    getUserLogged()
    getData()

  }, []);
  return (
    <>
  <Div>
  <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '10vh'}}>
    <img style={{width: '15%'}} src={trophy} alt='trofeu'></img>
    <h1 style={{fontSize: '60px', color: 'white'}}>HALL DA FAMA</h1>
    <img style={{width: '15%'}} src={trophy} alt='trofeu'></img>
  </div>
  <table style={{borderSpacing: '0', width: '60%', color: 'white'}}>
          <tr>
            <th style={{background: '#000', border: '1px solid white', color: 'white', textAlign: 'center'}}>Posição</th>
            <th style={{background: '#000', border: '1px solid white', color: 'white', textAlign: 'center'}}>Nome</th>
            <th style={{background: '#000', border: '1px solid white', color: 'white', textAlign: 'center'}}>Premiação</th>
          </tr>
    {ranking.map((user, index) => {
      if(index < 10){
      return (
            <tr>
            <td style={{background: '#FBC80A', border: '1px solid white', textAlign: 'center'}}>{index+1}°</td>
            <td style={{background: '#FBC80A', border: '1px solid white', textAlign: 'center'}}>{user.name}</td>
            <td style={{background: '#FBC80A', border: '1px solid white', textAlign: 'center'}}>{user.allAward}</td>
          </tr>
      )
      } 
    })}
    </table>
    {
      ranking.map((user, index) => {
        if(user.nickname === userLogged.nickname){
          return (
            <div style={{background: 'black', display: 'flex', width: '30%', color: 'white', padding: '10px', justifyContent: 'center', borderRadius: '20px', marginTop: '5vh'}}>
              <div>
                {userLogged.avatar && <img src={`http://localhost:5555/images/${userLogged.avatar}`} alt='avatar' style={{width: '5vw', height: '5vw', borderRadius: '50%'}}/>}
                {!userLogged.avatar && <FaUserAlt style={{color: 'white', background: 'transparent', width: '50px', height: '50px', cursor: 'pointer'}}/>}
                <h4>{userLogged.nickname}</h4>
              </div>
              <div style={{marginLeft: '1vw'}}>
                <h4>Nome: {userLogged.name}</h4>
                <h4>Posição: {index + 1}°</h4>
                <h4>Premiação: {user.allAward}</h4>
              </div>
              <div style={{marginLeft: '1vw'}}>
                <h4>Partidas: {userLogged.games.length}</h4>
                <h4>Derrotas: {user.losers}</h4>
              </div>
            </div>
          )
        }

      })
    }
  </Div>
    </>
  );
}