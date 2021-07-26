import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';

import App from './App';
import './index.css';

const store = createStore( reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App/> 
    </Provider>,    
    document.getElementById('root')// app component, we are connecting to div with an id of root
);

//now since we have connected app with store and reducer we have to dispatch our getPost action in App.js