import React from 'react';
import Routes from './platform/routes';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const client = new ApolloClient();
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes />
      </Router>
    </ApolloProvider>
  );
};

export default App;