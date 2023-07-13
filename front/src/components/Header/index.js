import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../../Context/AuthContext';
import { CgLogOut } from 'react-icons/cg';
import { Div, Notifications } from "./styled";
import Noty from '../Notify/index'
import { Link } from 'react-router-dom';
import {FaUserAlt} from 'react-icons/fa'
// component que define o cabeçalho do site, onde tem as notificações, foto de usuário e botão de deslogar

export default function Header(props){
  const [notify, setNotify] = useState(false)
  const { handleLogout } = useContext(Context);
  const avatarUser = props.avatar
  console.log(props.notifications)
  const handleWindowClick = () => setNotify(false)
  useEffect(() => {
    if(notify) {
      window.addEventListener('click', handleWindowClick);
    } else {
      window.removeEventListener('click', handleWindowClick);
    }
    return () => window.removeEventListener('click', handleWindowClick)
}, [notify, setNotify]);
  const notifications = []
  for(let notification of props.notifications){
    if(!notification.answered &&  !(notification.question.status.id === 3)){
      notifications.push(notification)
    }
  }
  return (
    <Div>
      <div onClick={() => setNotify(true)}><Noty width={"50px"} color={"#fff"}  count={notifications.length}/></div>
      {notify && <Notifications>
        <h2 style={{margin: '10px 5px'}}>Notificações</h2>
        <hr/>
        {notifications.map(repo => {
            if(!repo.answered && !(repo.question.status.id === 3)){
              return (
                <div key={repo.id} >
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <div style={{margin: '20px 0px'}}>
                    <Link to = {'/questions-accept/' + repo.id} style={{cursor: 'pointer', textDecoration: 'none'}}><p style={{margin: '0px 5px', fontSize: '20px'}}>Aprove ou reprove a pergunta com enunciado: <strong>{repo.question.statement}</strong></p>
                    </Link>
                    <p style={{margin: '0px 5px', fontSize: '14px', color: 'blue'}}>{new Date(repo.createdAt).getDate() === new Date().getDate() ? 'Hoje' : new Date(repo.createdAt).toLocaleString('pt-br').split(' ')[0]}</p>
                    <hr/>
                    </div>       
                </div>
            );
            }
                })}
        </Notifications>}
        <Link to = {'/users/' + JSON.parse(localStorage.getItem('id'))} style={{cursor: 'pointer', textDecoration: 'none', color: '#fff'}}>

        <button type="button" style={{border: 'none', background: 'transparent', marginRight: '30px', marginLeft: '30px'}}>
      {avatarUser && <img src={'http://localhost:5555/images/' + avatarUser} alt='foto do usuário' style={{ width: '50px', height: '50px', cursor: 'pointer', borderRadius: '50%'}}></img>}
      {!avatarUser && <FaUserAlt style={{color: 'white', background: 'transparent', width: '50px', height: '50px', cursor: 'pointer'}}/>}
      </button>
        </Link>
      

      <button type="button" style={{border: 'none', background: 'transparent', marginRight: '10px', width: '50px', height: '50px'}} onClick={handleLogout}>
      <CgLogOut size={40} style={
      {
        color: '#fff',
        backgroundColor: 'transparent', 
        cursor: 'pointer'
      }
      }/>
      </button>
    </Div>
  )
}