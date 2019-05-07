import React from 'react';

const PokemonItem = (props) => {
    return (
        <li className="pokemon__item">
            <img className="pokemon__item__avatar" src={props.avatar}/>
            <div>
            <span className="pokemon__item__name">
                {props.name}
            </span>
                <span className="pokemon__item__types">
                {props.type.map((type, i) => (
                    <span key={i}>{props.type[0].type.name}</span>
                ))}
            </span>
                <span className="pokemon__item__name">
                {props.content}
            </span>
            </div>
        </li>
    );
};


export default PokemonItem;
