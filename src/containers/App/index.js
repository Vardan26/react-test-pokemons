import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Wrapper from '../../hoc/Wrapper';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Pokemon from '../../containers/Pokemons';

import { _pokemons_ } from '../../store';

class App extends Component {
    componentDidMount() {
        _pokemons_.getPokemonData();
        _pokemons_.getPokemonDataTypes();
    }

    render() {
        return (
            <Wrapper>
                <Header/>
                <main className="main">
                    <Aside/>
                    <Pokemon/>
                </main>
            </Wrapper>
        );
    }

}

export default inject('_pokemons_')(observer(App));
