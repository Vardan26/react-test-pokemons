import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import Wrapper from "../../hoc/Wrapper";
import Header from "../../components/Header";
import Aside from "../../components/Aside";
import Pokemon from "../../containers/Pokemons";

class App extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <Wrapper>
                <Header/>
                <main>
                    <div className="container">
                        <Aside/>
                        <Pokemon/>
                    </div>
                </main>
            </Wrapper>
        );
    }
}

export default inject('_app_')(observer(App));
