import React from 'react';
import PokemonItem from '../../components/pokemonItem';
import { inject, observer } from 'mobx-react';
import ReactPaginate from 'react-paginate';

const Pokemons = (props) => {
    // let loading  = _app_.loading;
    let pokemons = props._pokemons_.pokemonDataCopy;
    return (
        <div className="pokemons">
        <ul className="pokemons__list">
            {pokemons.length ?
                pokemons.map((pokemon, i) => (
                    <PokemonItem
                        key={i}
                        name={pokemon.name}
                        avatar={pokemon.avatar}
                        types={pokemon.types}
                        weight={pokemon.weight}
                        height={pokemon.height}
                        abilities={pokemon.abilities}/>
                )) : null }
        </ul>
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={props._pokemons_.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={props._pokemons_.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default inject('_pokemons_')(observer(Pokemons));
