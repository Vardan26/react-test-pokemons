import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import PokemonItem from "../../components/pokemonItem";

class Pokemons extends Component {

    async componentDidMount() {
        await  this.props._pokemons_.doGetPokemons();
    }
    render() {
        const {pokemons} = this.props._pokemons_;
        // console.log(pokemons);
        return (
            <ul className="pokemons">
                {pokemons.length ?
                    pokemons.map((pokemon, i) => (
                        <PokemonItem
                        key={i}
                        name={pokemon.species.name}
                        avatar={pokemon.sprites.front_default || "avatar"}
                        type={pokemon.types}
                        content={pokemon.content || "some content"}/>
                    )) : null
                }
            </ul>
        );
    }
}

export default inject('_pokemons_')(observer(Pokemons));
