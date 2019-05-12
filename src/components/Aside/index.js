import React from 'react';
import { inject, observer } from 'mobx-react';


const Aside = (props) => {
    const types = props._pokemons_.pokemonTypes;
    return (
        <aside className="aside">
            <h3>Filter by categories</h3>
            <ul className="types">
                {
                    types ? types.map((type, i) => (
                        <li className="type__item" key={i}>
                            <label className="check-label" htmlFor={type.name}>
                                <span className="check-input__wrap">
                                    <input onChange={() => props.getSelectedTypes (type.name)}
                                           type="checkbox"
                                           id={type.name}
                                           value={type.name}/>
                                    <span className="check-input__span"/>
                                </span>
                                <span className="type__item__name">{type.name}</span>
                            </label>
                        </li>
                    )) : ''
                }
            </ul>
        </aside>
    );
};

export default inject('_pokemons_')(observer(Aside));
