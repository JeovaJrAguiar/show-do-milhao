import { useState, useEffect } from 'react';

import api from '../../api';
import history from '../../history';

// componente que define como é feito o cadastro e logout da aplicação

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      api.defaults.headers.Authorization = `${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  async function handleLogin(dataLogin) {
      console.log(dataLogin)

      const data = {
        username: 'aguiar',
        password: 'aguiar',
        grant_type: 'password'
      }

      console.log(data)
      const { data: { access_token, user_id } } = await api.post('/oauth/token', {
        data: data,
        headers: { "Content-type": "multipart/form-data" }
      }, {
        auth: {
          username: 'ShowDoMilhao',
          password: 'drhhdrbDRFGHSvds4235!@##$'
        }
      });

      api.defaults.headers.Authorization = `${access_token}`;

      localStorage.setItem('id', JSON.stringify(user_id));
      localStorage.setItem('token', JSON.stringify(access_token));
      setAuthenticated(true);

      history.push('/');
  }
  async function handleSignUp(dataSignUp) {
    try {
      const { data: { accessToken, user } } = await api.post('/users', dataSignUp)
      api.defaults.headers.Authorization = `${accessToken}`;
      console.log(user.id)
      localStorage.setItem('token', JSON.stringify(accessToken));
      localStorage.setItem('id', JSON.stringify(user.id));
      setAuthenticated(true);
      history.push('/');
    } catch (error) {
      console.log(error)
    }


  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }
  
  return { authenticated, loading, handleLogin, handleLogout, handleSignUp };
}