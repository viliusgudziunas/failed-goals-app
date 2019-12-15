import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Index from './components/Index';
import RegisterForm from './components/RegisterForm';

const App = () => {
  return (
    <Router>
      <div className='container'>
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

        <Provider store={store}>
          <Switch>
            <Route exact path='/'>
              <Index />
            </Route>
            <Route exact path='/register'>
              <RegisterForm />
            </Route>
          </Switch>
        </Provider>
      </div>
    </Router>
  );
};

export default App;
