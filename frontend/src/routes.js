import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from './Context/AuthContext';
// componente onde se define as rotas, o que será carregado em cada rota e quais rotas são públicas ou privadas
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Questions from './pages/Questions';
import QuestionsAdd from './pages/QuestionsAdd';
import QuestionsAccept from './pages/QuestionsAccept';
import QuestionsUpdate from './pages/QuestionsUpdate';
import Game from './pages/Game';
import User from './pages/User';
import Statistic from './pages/Statistic';
import Ranking from './pages/Ranking';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute exact path="/sign-up" component={SignUp} />
      <CustomRoute isPrivate exact path="/" component={Home} />
      <CustomRoute isPrivate exact path="/questions" component={Questions} />
      <CustomRoute isPrivate exact path="/questions-add" component={QuestionsAdd} />
      <CustomRoute isPrivate exact path="/questions-accept/:id" component={QuestionsAccept} />
      <CustomRoute isPrivate exact path="/questions-update/:id" component={QuestionsUpdate} />
      <CustomRoute isPrivate exact path="/game" component={Game} />
      <CustomRoute isPrivate exact path="/users/:id" component={User} />
      <CustomRoute isPrivate exact path="/statistic/:id" component={Statistic} />
      <CustomRoute isPrivate exact path="/ranking" component={Ranking} />
    </Switch>
  );
}