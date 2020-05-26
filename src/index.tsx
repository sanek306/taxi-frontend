import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App'
import { ApolloProvider } from 'react-apollo'
import client from './apollo'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import GlobalStyle from './global-styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
        <ToastContainer draggable={true} position={'bottom-center'} />
    </ApolloProvider>,
    document.getElementById('root')
);
