import React from 'react';
import pacmanLoader from  "../../assets/img/Pacman-1s-200px.svg";

const PokemonItem = (props) => {
    const {
        avatar,
        name,
        types,
        weight,
        height,
        abilities
    } = props;
    let randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    let item;
    props ? item =
            <li className="pokemons__item">
                <div className="pokemons__item__avatar"
                     style={{ backgroundImage:   `url(${avatar ? avatar : pacmanLoader}` }}/>
                <div className='pokemons__item__cont'>
                <span className="pokemons__item__name">
                    {name}
                </span>
                    <span className="pokemons__item__types">
                    {types.map((type, i) => (
                        <span style={{background: randomColor}} data-types={type} key={i}/>
                    ))}
                </span>
                    <ul className="pokemons__item__info">
                        <li>weight: {weight}kg</li>
                        <li>height: {height}m</li>
                        <li className="pokemons__item__ability">
                           <span className="pokemons__item__ability__title"> abilities</span>
                            {abilities.map((ability, i) => (
                                <span key={i}>{ability}</span>
                            ))}
                        </li>
                    </ul>
                </div>
            </li> : <li className="pokemons__item">
       loading........
    </li> ;
    return (
        item
    );
};
export default PokemonItem;
