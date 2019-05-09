import React from 'react';
import { inject, observer } from 'mobx-react';


const Aside = (props) => {
    const types = props._pokemons_.pokemonTypes;
    return (
        <aside className="aside">
            <ul className="types">
                {
                    types ? types.map((type, i) => (
                        <li className="type__item" key={i}>
                            <input type="checkbox" value={type.name}/>
                            <span className="type__item__name" >{type.name}</span>
                        </li>
                    )) : ''
                }
            </ul>
        </aside>
    );
};

export default inject('_pokemons_')(observer(Aside));
