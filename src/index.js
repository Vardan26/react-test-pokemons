import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "mobx-react";

import {_app_, _pokemons_} from 'store/index';
import  'assets/css/main.scss';

import App from './containers/App';

const store = {_app_,  _pokemons_};


ReactDOM.render(
    <BrowserRouter>
        <Fragment>
            <Provider {...store}>
                <App/>
            </Provider>
        </Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);
