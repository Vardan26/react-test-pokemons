import React from 'react';

const PokemonItem = (props) => {
    const {
        avatar,
        name,
        types,
        weight,
        height,
        abilities
    } = props;

    return (
        <li className="pokemons__item">
                <div className="pokemons__item__avatar"
                     style={{ backgroundImage: `url(${avatar})` }}/>
                <div className='pokemons__item__cont'>
                <span className="pokemons__item__name">
                    {name}
                </span>
                    <span className="pokemons__item__types">
                    {types.map((type, i) => (
                        <span key={i}>{type}</span>
                    ))}
                </span>
                    <ul className="pokemons__item__info">
                        <li>{weight}</li>
                        <li>{height}</li>
                        {abilities.map((ability, i) => (
                            <li key={i}>{ability}</li>
                        ))}
                    </ul>
                </div>
        </li>
    );
};
export default PokemonItem;
