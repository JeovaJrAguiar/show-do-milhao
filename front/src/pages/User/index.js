import React from 'react';
import api from '../../api';
import { useState } from 'react';
import { useEffect } from 'react';
import {FaUserAlt} from 'react-icons/fa'
import history from '../../history';

export default function User() {
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarSelected, setAvatarSelected] = useState('')
  const [games, setGames] = useState([])
  const id = JSON.parse(localStorage.getItem('id'))
  async function getData(){
    console.log(id)
    if(id !== null){
      const {data} = await api.get(`/users/${Number(id)}`)
      setName(data.name)
      setAvatar(data.avatar)
      setNickname(data.nickname)
      setGames(data.games)
    }
  }
  useEffect(() => {
      getData()
  }, []);
  async function send(e){
    e.preventDefault()
    const data = new FormData()
    const avatarInput = document.querySelector('.file');
    console.log(avatarInput.files[0])
    if(avatarSelected){
    let blob = await fetch(avatarSelected).then(r => r.blob())
    data.append('avatar', blob);
    }
    data.append('name', name)
    data.append('nickname', nickname)
    await api.put(`users/${JSON.parse(localStorage.getItem('id'))}`, data, {headers: {
      'Content-Type': 'multipart/form-data'
    }})
    history.push('/')
  }
  function addAvatar(evt){
    if (!(evt.target && evt.target.files && evt.target.files.length > 0)) {
      
      return;
    }
    
    const file = evt.target.files.item(0)
    console.log(file)
    setAvatarSelected(URL.createObjectURL(file))
    setAvatar(URL.createObjectURL(file))
    }
    function statistic (){
      history.push('/statistic/' + id)
    }
    function getAwardAll(){
      let qtd = 0
      games.forEach(game => {
        qtd += game.award
      })
      return qtd
    }
    async function deleteAccount(e){
      e.preventDefault()
      localStorage.removeItem('id')
      localStorage.removeItem('token')
      await api.delete(`users/${id}`)
      history.push('/login')
    }
  return (
    <>
  <form>
    <div style={{display: 'flex', width: '95vw', height: '90vh', marginLeft: '2vw', marginTop: '5vh'}}>
      <div style={{width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px', border: '2px solid #0790F3'}}>
        <button style={{width: '95%', height: '5vh', margin: '5px', borderRadius: '10px', background: '#0F1C8E', color: '#fff', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: 'bolder', fontSize: '19px', cursor: 'pointer'}}>Minha conta</button>
        <button style={{width: '95%', height: '5vh', margin: '5px', borderRadius: '10px', background: '#040B49', color: '#fff', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: 'bolder', fontSize: '19px', cursor: 'pointer'}} onClick={statistic}>Minhas estatísticas</button>
      </div>
      <div style={{width: '70%', marginLeft: '2%', borderRadius: '10px', border: '2px solid #0790F3', padding: '20px'}}>
      <div>
        <form>
        
        <div style={{display: 'flex', alignItems: 'center' }}>
        {avatar && <div>
        <label for="filed"><div style={{width: '90px', height: '90px', background: '#000', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src={avatarSelected ? avatarSelected: 'http://localhost:5555/images/' + avatar} alt="avatar" style={{width: '90%', height: '90%', borderRadius: '50%'}}/></div></label>
          <input onChange={(addAvatar)} id="filed" className='file' type='file'style={{display: 'none'}}/>
          </div>}
        {!avatar && <div>
          <label for="file"><div style={{width: '90px', height: '90px', background: '#000', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <FaUserAlt style={{color: 'white', background: 'transparent', width: '60px', height: '60px', cursor: 'pointer'}}/></div></label>
          <input onChange={(addAvatar)} id="file" className='file' type='file'style={{display: 'none'}}/>
          </div>}
        <input id="file" className='file-send' style={{display: 'none'}} type='file'/>
        <input style={{width: '40vw', height: '5vh', marginLeft: '4vw', background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '19px', fontWeight: 'bold'}} value={nickname} onChange={(e) => setNickname(e.target.value)}/>
        </div>
        <div style={{width: '90%', marginTop: '2vh', background: '#101111', padding: '10px', borderRadius: '10px'}}>
        <input style={{width: '20vw', height: '5vh', background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '19px', fontWeight: 'bold'}} value={name} onChange={(e) => setName(e.target.value)}/>
        <div style={{color: 'white', fontSize: '19px', fontWeight: 'bold'}}>Partidas jogadas: {games.length}</div>
        <div style={{color: 'white', fontSize: '19px', fontWeight: 'bold'}}>Ganho total: {getAwardAll()}
        </div>
        </div>
        <div style={{width: '100%', margin: '2vh auto', padding: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <button style={{             
            width: '25%',
            height: '7vh',
            border: 'none',
            background: '#F0D514',
            borderRadius: '25px',
            cursor: 'pointer',
            color: '#fff',
            marginTop: '3vh',
            fontSize: '20px'}}
            onClick={send}
            >Salvar</button>
          <button style={{             
            width: '25%',
            height: '7vh',
            border: 'none',
            background: '#C61010',
            borderRadius: '25px',
            cursor: 'pointer',
            color: '#fff',
            marginTop: '3vh',
            marginLeft: '2vw',
            fontSize: '20px'}}
            onClick={deleteAccount}
            >Excluir conta</button>
        </div>
        </form>
      </div>
    </div>
    </div>
  </form>
    </>
  );
}
