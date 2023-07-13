import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './routes';
import history from './history';
import { AuthProvider } from './Context/AuthContext';
import GlobalStyle from './globalStyle';

// componente principal da aplicação

function App() {

  return (
    <AuthProvider>
      <GlobalStyle/>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
