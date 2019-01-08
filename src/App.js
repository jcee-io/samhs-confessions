import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FormPage from './FormPage';
import AdminPage from './AdminPage';
import './style/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/" component={FormPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
