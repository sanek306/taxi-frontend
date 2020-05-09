import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import {ApolloProvider} from "react-apollo";
import client from "./apollo";
import {ThemeProvider} from "styled-components";
import theme from "./theme";
import GlobalStyle from "./global-styles";


ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
              <GlobalStyle/>
              <App/>
          </ThemeProvider>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
