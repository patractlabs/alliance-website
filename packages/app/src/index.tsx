import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import GlobalStyle from './shared/style';

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <GlobalStyle linkColor='#e6007a' />
      <App />
    </React.Fragment>
  </React.StrictMode>,
  document.getElementById('root')
);
