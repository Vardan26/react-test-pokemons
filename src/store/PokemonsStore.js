import {types} from 'mobx-state-tree';
import {requestService} from '../hoc/RequestService';
import {_app_} from './AppStore';


const PokemonsStore = types
    .model('Common', {
        pokemons: types.frozen(),
    })
    .actions(self => ({
        setPokemons(pokemons) {
            self.pokemons = self.pokemons.concat(pokemons)
        },

        async doGetPokemons() {
            const url = `https://pokeapi.co/api/v2/pokemon`;
            let pokemonDataUrl = "";
            const options = {
                method: 'GET',
            };

            const pokemon = await requestService.getRequest(url, options);

            if (pokemon) {
                for (let key in pokemon.results) {
                    pokemonDataUrl = `${url}/${pokemon.results[key].name}`;
                    const data = await requestService.getRequest(pokemonDataUrl, options);
                    self.setPokemons(data)
                }
            }
        },
    }));
const _pokemons_ = PokemonsStore.create({pokemons: []});

export {_pokemons_};

