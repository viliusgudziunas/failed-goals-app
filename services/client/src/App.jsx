import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Index from './components/Index';
import RegisterForm from './components/RegisterForm';

const App = () => {
  return (
    <Router>
      <Container>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path='/'>
            <Index />
          </Route>
          <Route exact path='/register'>
            <RegisterForm />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
