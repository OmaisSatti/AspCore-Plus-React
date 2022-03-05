import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchDeveloper } from './components/FetchDeveloper';
import { EditDeveloper } from './components/EditDeveloper';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/developer' component={FetchDeveloper} />
            <Route path='/editdeveloper' component={EditDeveloper} />
      </Layout>
    );
  }
}
