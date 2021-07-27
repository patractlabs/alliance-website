import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import { cache } from './core/cache';
import GlobalStyle from './shared/style';
import { ApolloClient, NormalizedCacheObject, ApolloProvider } from '@apollo/client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'https://api.alliance.patract.io/graphql',
  resolvers: {}
});

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <GlobalStyle linkColor='#e6007a' />
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.Fragment>
  </React.StrictMode>,
  document.getElementById('root')
);
