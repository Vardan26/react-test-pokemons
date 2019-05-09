import React from 'react';
import { _pokemons_ } from '../../store';
import { inject, observer } from 'mobx-react';

const Header = (props) => {
    return (
        <header className="header">
            <div className="container">
                <label>
                    <input onChange={props._pokemons_.getFilteredList} type="text" className="header__search"/>
                </label>
            </div>
        </header>
    );
};

export default inject('_pokemons_')(observer(Header));

